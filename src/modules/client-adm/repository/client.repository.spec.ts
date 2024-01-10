import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const clientProps = {
      id: new Id("1"),
      name: "Client 1",
      email: "x@y.com",
      document: "xpto",
      street: "Rua Bla",
      number: "123",
      complement: "456",
      city: "Dinossauro",
      state: "Verde",
      zipCode: "123",
    };

    const client = new Client(clientProps);
    const clientRepository = new ClientRepository();
    await clientRepository.add(client);

    const clientDb = await ClientModel.findOne({
      where: { id: clientProps.id.id },
    });

    expect(clientProps.id.id).toEqual(clientDb.id);
    expect(clientProps.name).toEqual(clientDb.name);
    expect(clientProps.email).toEqual(clientDb.email);
    expect(clientProps.document).toEqual(clientDb.document);
    expect(clientProps.street).toBe(clientDb.street);
    expect(clientProps.number).toBe(clientDb.number);
    expect(clientProps.complement).toBe(clientDb.complement);
    expect(clientProps.city).toBe(clientDb.city);
    expect(clientProps.state).toBe(clientDb.state);
    expect(clientProps.zipCode).toBe(clientDb.zipCode);
  });

  it("should find a client", async () => {
    const clientRepository = new ClientRepository();

    const client = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "x@y.com",
      document: "xpto",
      address: "Address 1",
      street: "Rua Bla",
      number: "123",
      complement: "456",
      city: "Dinossauro",
      state: "Verde",
      zipCode: "123",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await clientRepository.find("1");

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.street).toBe(client.street);
    expect(result.number).toBe(client.number);
    expect(result.complement).toBe(client.complement);
    expect(result.city).toBe(client.city);
    expect(result.state).toBe(client.state);
    expect(result.zipCode).toBe(client.zipCode);
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  });
});
