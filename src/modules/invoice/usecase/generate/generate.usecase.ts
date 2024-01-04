import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceItems from "../../domain/entity/InvoiceItems";
import Invoice from "../../domain/entity/invoice";
import Address from "../../domain/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate.usecase.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  private _invoiceRepository: InvoiceGateway;

  constructor(_invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = _invoiceRepository;
  }

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      document: input.document,
      address: new Address(
        input.address.street,
        input.address.number,
        input.address.complement,
        input.address.city,
        input.address.state,
        input.address.zipCode
      ),
      items: input.items.map((item) => {
        return new InvoiceItems({
          id: item.id,
          name: item.name,
          price: item.price,
          createdAt: new Date(),
        });
      }),
    };

    //também demorei pra lembrar de usar o map ao invés do forEach que eu estava tentando anteriormente

    const invoice = new Invoice(props);

    this._invoiceRepository.generate(invoice);

    const itensFromInvoice = invoice.items.map((item) => {
      return new InvoiceItems({
        id: item.id,
        name: item.name,
        price: item.price,
      });
    });

    //fiquei travado um tempo e depois vi que não estava inicializando o a propriedade _items na entidade Invoice nem colocado o get items()

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: itensFromInvoice,
      total: this.invoiceTotal(itensFromInvoice),
    };
  }

  private invoiceTotal(items: InvoiceItems[]): number {
    const sumOfTotal = items.reduce((total, item) => total + item.price, 0);

    return sumOfTotal;
  }
}
