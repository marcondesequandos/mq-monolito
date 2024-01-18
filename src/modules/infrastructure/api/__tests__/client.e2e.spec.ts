import { Sequelize } from "sequelize-typescript";
import { app } from "../express";
import request from "supertest";
import { ClientModel } from "../../../client-adm/repository/client.model";

describe("E2E test for client", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const response = await request(app).post("/client").send({
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

    expect(response.status).toBe(200);
    expect(response.body.id).toBe("1");
    expect(response.body.name).toBe("Client 1");
    expect(response.body.email).toBe("x@y.com");
    expect(response.body.document).toBe("xpto");
    expect(response.body.street).toBe("Rua Bla");
    expect(response.body.number).toBe("123");
    expect(response.body.complement).toBe("456");
    expect(response.body.city).toBe("Dinossauro");
    expect(response.body.state).toBe("Verde");
    expect(response.body.zipCode).toBe("123");
  });
});
