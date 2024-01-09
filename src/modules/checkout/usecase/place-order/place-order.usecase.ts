import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";

import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice-facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/payment.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface;
  private _productFacade: ProductAdmFacadeInterface;
  private _catalogFacade: StoreCatalogFacadeInterface;
  private _repository: CheckoutGateway;
  private _invoicefacade: InvoiceFacadeInterface;
  private _paymentFacade: PaymentFacadeInterface;

  constructor(
    clientFacade: ClientAdmFacadeInterface,
    productFacade: ProductAdmFacadeInterface,
    catalogFacade: StoreCatalogFacadeInterface,
    repository: CheckoutGateway,
    invoiceFacade: InvoiceFacadeInterface,
    paymentFacade: PaymentFacadeInterface
  ) {
    this._clientFacade = clientFacade;
    this._productFacade = productFacade;
    this._catalogFacade = catalogFacade;
    this._repository = repository;
    this._invoicefacade = invoiceFacade;
    this._paymentFacade = paymentFacade;
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this._clientFacade.findClient({ id: input.clientId });

    if (!client) {
      throw new Error("Client not found");
    }

    await this.validateProducts(input);

    const products = await Promise.all(
      input.products.map((p) => this.getProduct(p.productId))
    );

    const myClient = new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.street,
    });

    const order = new Order({
      client: myClient,
      products,
    });

    // processpayment => paymentfacade.process (orderid, amount)

    // caso pagamento seja aprovado. -> Gerar invoice
    // mudar o status da minha order para approved

    // retornar dto
    return {
      id: "",
      invoiceId: "",
      status: "",
      total: 0,
      products: [],
    };
  }

  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if (input.products.length === 0) {
      throw new Error("No products selected");
    }

    // ver se traz pra outro método esse trecho abaixo validateCheckStock

    for (const p of input.products) {
      const product = await this._productFacade.checkStock({
        productId: p.productId,
      });

      if (product.stock <= 0) {
        throw new Error(
          `Product ${product.productId} is not available in stock`
        );
      }
    }
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this._catalogFacade.find({ id: productId });

    if (!product) {
      throw new Error("Product not found");
    }

    const productProps = {
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
    return new Product(productProps);
  }
}
