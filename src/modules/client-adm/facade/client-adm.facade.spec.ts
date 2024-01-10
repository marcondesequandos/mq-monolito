import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientAdmFacadeFactory from "../factory/facade.factory";

describe("ClientAdmFacade test", () => {
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
    const clientFacade = ClientAdmFacadeFactory.create();

    const input = {
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
    };

    await clientFacade.addClient(input);

    const client = await ClientModel.findOne({ where: { id: "1" } });

    expect(client).toBeDefined();
    expect(client.id).toBe(input.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.street).toBe(input.street);
    expect(client.number).toBe(input.number);
    expect(client.complement).toBe(input.complement);
    expect(client.city).toBe(input.city);
    expect(client.state).toBe(input.state);
    expect(client.zipCode).toBe(input.zipCode);
  });

  it("should find a client", async () => {
    const clientFacade = ClientAdmFacadeFactory.create();

    const input = {
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
    };

    await clientFacade.addClient(input);

    const result = await clientFacade.findClient({ id: "1" });

    expect(result.id).toBe(input.id);
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
  });
});
