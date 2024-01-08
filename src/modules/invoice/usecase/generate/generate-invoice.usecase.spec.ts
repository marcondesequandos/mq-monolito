import GenerateInvoiceUseCase from "./generate-invoice.usecase";
import { GenerateInvoiceUseCaseInputDto } from "./generate-invoice.usecase.dto";

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn(),
  };
};

describe("Generate invoice use case unit test", () => {
  it("should generate a invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(invoiceRepository);
    const input: GenerateInvoiceUseCaseInputDto = {
      id: "1",
      name: "Client 1",
      document: "123456789",
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

    const result = await usecase.execute(input);

    expect(invoiceRepository.generate).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
    expect(result.items[0].id).toBe(input.items[0].id);
    expect(result.items[0].name).toBe(input.items[0].name);
    expect(result.items[0].price).toBe(input.items[0].price);
    expect(result.items[1].id).toBe(input.items[1].id);
    expect(result.items[1].name).toBe(input.items[1].name);
    expect(result.items[1].price).toBe(input.items[1].price);
    expect(result.total).toBe(80);
  });
});
