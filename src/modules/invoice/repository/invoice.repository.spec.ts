import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/invoice";
import Address from "../domain/value-object/address.value-object";
import InvoiceItems from "../domain/entity/InvoiceItems";
import InvoiceRepository from "./invoice.repository";
import { InvoiceItemModel } from "./invoice-item.model";

describe("InvoiceRepository test", () => {
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

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate a invoice", async () => {
    const invoiceItems = [
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
    ];

    //OutputInvoice

    const invoiceProps = new Invoice({
      id: new Id("1"),
      name: "Client 1",
      document: "123456789",
      address: new Address(
        "Rua Sr Cabeca de Batata",
        "123",
        "Apartamento",
        "Sorocaba",
        "Sao Paulo",
        "1234569"
      ),
      items: invoiceItems.map((item) => {
        return new InvoiceItems({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        });
      }),
    });

    const invoice = new Invoice(invoiceProps);
    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.generate(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: "1" },
      include: [InvoiceItemModel],
    });

    expect(invoiceProps.id.id).toEqual(invoiceDb.id);
    expect(invoiceProps.name).toEqual(invoiceDb.name);
    expect(invoiceProps.name).toEqual(invoiceDb.name);
    expect(invoiceProps.document).toBe(invoice.document);
    expect(invoiceProps.address.city).toBe(invoiceDb.city);
    expect(invoiceProps.address.complement).toBe(invoiceDb.complement);
    expect(invoiceProps.address.street).toBe(invoiceDb.street);
    expect(invoiceProps.address.number).toBe(invoiceDb.number);
    expect(invoiceProps.address.zipCode).toBe(invoiceDb.zipCode);
    expect(invoiceProps.address.state).toBe(invoiceDb.state);
    expect(invoiceProps.items[0].id.id).toBe(invoiceDb.items[0].id);
    expect(invoiceProps.items[0].name).toBe(invoiceDb.items[0].name);
    expect(invoiceProps.items[0].price).toBe(invoiceDb.items[0].price);
    expect(invoiceProps.items[1].id.id).toBe(invoiceDb.items[1].id);
    expect(invoiceProps.items[1].name).toBe(invoiceDb.items[1].name);
    expect(invoiceProps.items[1].price).toBe(invoiceDb.items[1].price);
    expect(invoiceDb.total).toBe(
      invoice.items.reduce((total_price, item) => total_price + item.price, 0)
    );
  });

  it("should find a invoice", async () => {
    const invoiceItems = [
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
    ];

    const invoiceProps = new Invoice({
      id: new Id("1"),
      name: "Client 1",
      document: "123456789",
      address: new Address(
        "Rua Sr Cabeca de Batata",
        "123",
        "Apartamento",
        "Sorocaba",
        "Sao Paulo",
        "1234569"
      ),
      items: invoiceItems.map((item) => {
        return new InvoiceItems({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        });
      }),
    });

    const invoice = new Invoice(invoiceProps);
    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.generate(invoice);

    const result = await invoiceRepository.find(invoice.id.id);

    expect(result).toBeDefined();
    expect(result.id.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);
    expect(result.items.length).toBe(2);
    expect(result.items[0].id.id).toBe(invoice.items[0].id.id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[1].id.id).toBe(invoice.items[1].id.id);
    expect(result.items[1].name).toBe(invoice.items[1].name);
    expect(result.items[1].price).toBe(invoice.items[1].price);
    expect(result.total).toBe(
      invoice.items.reduce((total_price, item) => total_price + item.price, 0)
    );
  });
});
