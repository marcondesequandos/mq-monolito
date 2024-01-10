import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add client use case unit test", () => {
  it("should add a client", async () => {
    const clientRepository = MockRepository();
    const usecase = new AddClientUseCase(clientRepository);
    const input = {
      name: "João",
      email: "joao@bol.com.br",
      document: "xpto",
      street: "Rua Bla",
      number: "123",
      complement: "456",
      city: "Dinossauro",
      state: "Verde",
      zipCode: "123",
    };

    const result = await usecase.execute(input);

    expect(clientRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
  });
});
