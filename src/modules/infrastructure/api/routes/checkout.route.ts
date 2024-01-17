import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../client-adm/factory/facade.factory";
import ProductFacadeFactory from "../../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../store-catalog/factory/facade.factory";
import InvoiceFacadeFactory from "../../../invoice/factory/facade.factory";
import PaymentFacadeFactory from "../../../payment/factory/facade.factory";
import PlaceOrderUseCase from "../../../checkout/usecase/place-order/place-order.usecase";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create();
  const productFacade = ProductFacadeFactory.create();
  const catalogFacade = StoreCatalogFacadeFactory.create();
  const invoiceFacade = InvoiceFacadeFactory.create();
  const paymentFacade = PaymentFacadeFactory.create();
  const mockCheckoutRepository = {
    addOrder: jest.fn(),
    findOrder: jest.fn(),
  };

  const usecase = new PlaceOrderUseCase(
    clientFacade,
    productFacade,
    catalogFacade,
    mockCheckoutRepository,
    invoiceFacade,
    paymentFacade
  );

  try {
    const checkoutDto = {
      clientId: req.body.clientId,
      products: req.body.products,
    };

    const output = await usecase.execute(checkoutDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
