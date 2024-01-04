import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/value-object/address.value-object";
import GenerateInvoiceUseCase from "./generate.usecase";
import { GenerateInvoiceUseCaseInputDto } from "./generate.usecase.dto";

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
      address: {
        street: "Rua Sr Cabeca de Batata",
        number: "123",
        complement: "Apartamento",
        city: "Sorocaba",
        state: "Sao Paulo",
        zipCode: "1234569",
      },
      items: [
        {
          id: new Id("1"),
          name: "Gato de Botas",
          price: 50,
        },
        {
          id: new Id("2"),
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
    expect(result.address.street).toBe(input.address.street);
    expect(result.address.number).toBe(input.address.number);
    expect(result.address.complement).toBe(input.address.complement);
    expect(result.address.city).toBe(input.address.city);
    expect(result.address.state).toBe(input.address.state);
    expect(result.address.zipCode).toBe(input.address.zipCode);
    expect(result.items[0].id).toBe(input.items[0].id);
    expect(result.items[0].name).toBe(input.items[0].name);
    expect(result.items[0].price).toBe(input.items[0].price);
    expect(result.items[1].id).toBe(input.items[1].id);
    expect(result.items[1].name).toBe(input.items[1].name);
    expect(result.items[1].price).toBe(input.items[1].price);
    expect(result.total).toBe(80);
  });
});
