import { Sequelize } from "sequelize-typescript";
import { app } from "../express";
import request from "supertest";
import ProductModel from "../../../store-catalog/repository/product.model";
import { check } from "yargs";

describe("E2E test for checkout", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should make checkout", async () => {
    const client = await request(app).post("/client").send({
      id: "1",
      name: "Client 1",
      email: "x@y.com",
      document: "xpto",
      street: "Rua Bla",
      number: "123",
      complement: "456",
      city: "Dinossauro",
      state: "Verde",
      zipCode: "123",
    });

    const product1 = await request(app).post("/product").send({
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 70,
      stock: 30,
    });
    const product2 = await request(app).post("/product").send({
      name: "Product 2",
      description: "Description 2",
      purchasePrice: 50,
      stock: 50,
    });

    await ProductModel.create({
      id: product1.body.id,
      name: product1.body.name,
      description: product1.body.description,
      salesPrice: 130,
    });

    await ProductModel.create({
      id: product2.body.id,
      name: product2.body.name,
      description: product2.body.description,
      salesPrice: 90,
    });

    const checkout = await request(app)
      .post("/checkout")
      .send({
        clientId: client.body.id,
        products: [
          {
            productId: product1.body.id,
          },
          {
            productId: product2.body.id,
          },
        ],
      });

    expect(checkout.status).toBe(200);
    expect(checkout.body.products.length).toBe(2);
    expect(checkout.body.total).toBe(220);
    expect(checkout.body.status).toBe("approved");
  });
});
