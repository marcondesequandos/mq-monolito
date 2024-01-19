import { Sequelize } from "sequelize-typescript";
import { app } from "../express";
import request from "supertest";
import { InvoiceModel } from "../../../invoice/repository/invoice.model";
import InvoiceFacadeFactory from "../../../invoice/factory/facade.factory";
import { InvoiceItemsModel } from "../../../invoice/repository/invoice-item.model";

describe("E2E test for invoice", () => {
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
    await setTimeout(() => {
      sequelize.close();
    }, 1000);
  });

  it("should find an invoice", async () => {
    const input = {
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

    const facade = InvoiceFacadeFactory.create();
    const output = await facade.generateInvoice(input);

    const response = await request(app).get(`/invoice/${output.id}`).send();

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(input.name);
    expect(response.body.document).toBe(input.document);
    expect(response.body.address.street).toBe(input.street);
    expect(response.body.address.number).toBe(input.number);
    expect(response.body.address.complement).toBe(input.complement);
    expect(response.body.address.city).toBe(input.city);
    expect(response.body.address.state).toBe(input.state);
    expect(response.body.address.zipCode).toBe(input.zipCode);
    expect(response.body.items[0].id).toBeDefined();
    expect(response.body.items[0].name).toBe(input.items[0].name);
    expect(response.body.items[0].price).toBe(input.items[0].price);
    expect(response.body.items[1].id).toBeDefined();
    expect(response.body.items[1].name).toBe(input.items[1].name);
    expect(response.body.items[1].price).toBe(input.items[1].price);
    expect(response.body.total).toBe(80);
  });
});
