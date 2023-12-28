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
      address: "R Major Sertorio, 422",
    };

    const result = await usecase.execute(input);

    expect(clientRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.address).toBe(input.address);
  });
});
