import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemsModel } from "../repository/invoice-item.model";
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

    await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

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
    expect(invoice.total).toBe(
      input.items.reduce((total_price, item) => total_price + item.price, 0)
    );
  });

  it("should find invoice", async () => {
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

    const output = await invoiceFacade.generateInvoice(input);

    const invoice = await invoiceFacade.findInvoice({ id: output.id });

    expect(invoice).toBeDefined();
    expect(invoice.id).toBe(input.id);
    expect(invoice.name).toBe(input.name);
    expect(invoice.document).toBe(input.document);
    expect(invoice.address.street).toBe(input.street);
    expect(invoice.address.number).toBe(input.number);
    expect(invoice.address.complement).toBe(input.complement);
    expect(invoice.address.city).toBe(input.city);
    expect(invoice.address.state).toBe(input.state);
    expect(invoice.address.zipCode).toBe(input.zipCode);
    expect(invoice.items[0].id).toBeDefined;
    expect(invoice.items[0].name).toBe(input.items[0].name);
    expect(invoice.items[0].price).toBe(input.items[0].price);
    expect(invoice.items[1].id).toBeDefined;
    expect(invoice.items[1].name).toBe(input.items[1].name);
    expect(invoice.items[1].price).toBe(input.items[1].price);
  });
});
