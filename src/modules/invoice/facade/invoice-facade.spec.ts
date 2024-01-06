import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemModel } from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/facade.factory";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  // afterEach(async () => {
  //   await sequelize.close();
  // });

  it("should generate invoice", async () => {
    const input = {
      id: "1",
      name: "Client 1",
      document: "1234567890",
      street: "Rua Sr Cabeca de Batata",
      number: "123",
      complement: "Apartamento",
      city: "Sorocaba",
      state: "Sao Paulo",
      zipCode: "1234569",
      items: [
        {
          id: "1",
          name: "Gato de Botas",
          price: 50,
        },
        {
          id: "2",
          name: "Buzz Lightyear",
          price: 30,
        },
      ],
    };

    const invoiceFacade = InvoiceFacadeFactory.create();

    const invoice = await invoiceFacade.generateInvoice(input);

    console.log("invoice =>", invoice);

    expect(invoice).toBeDefined();
    expect(invoice.id).toBe(input.id);
    expect(invoice.name).toBe(input.name);
    expect(invoice.street).toBe(input.street);
    expect(invoice.number).toBe(input.number);
    expect(invoice.complement).toBe(input.complement);
    expect(invoice.city).toBe(input.city);
    expect(invoice.state).toBe(input.state);
    expect(invoice.zipCode).toBe(input.zipCode);
    expect(invoice.items.length).toBe(2);
  });
});
