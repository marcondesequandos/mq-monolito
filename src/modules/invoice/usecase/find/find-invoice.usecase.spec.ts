import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/entity/InvoiceItems";
import Invoice from "../../domain/entity/invoice";
import Address from "../../domain/value-object/address.value-object";
import FindInvoiceUseCase from "./find-invoice.usecase";
//Eu quero poder encontras as Invoices geradas através de um id
//Para isso preciso criar:
//parâmetro privado repositório type Gateway (para ser inicializado)
//constructor recebendo readonly parameter do repositório type Gateway (que diz o parâmetro a ser recebido pela classe)
//inicialização do parâmetro da classe dentro do constructor da classe com o repositório recebido para poder ser utilizado depois no método execute
//método execute recebe dados da requisição do repositório find ao procurar com dados do inputDto
//retorna output esperado

//inputInvoiceItem

const invoiceItems = [
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
];

//OutputInvoice

const invoice = new Invoice({
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
      id: item.id,
      name: item.name,
      price: item.price,
    });
  }),
  createdAt: new Date(),
});

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("findInvoice usecase unit test", () => {
  it("should find an invoice", async () => {
    //inicializa repositório e use case

    const invoiceRepository = MockRepository();
    const usecase = new FindInvoiceUseCase(invoiceRepository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.items[0].id).toBe(invoice.items[0].id.id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[1].id).toBe(invoice.items[1].id.id);
    expect(result.items[1].name).toBe(invoice.items[1].name);
    expect(result.items[1].price).toBe(invoice.items[1].price);
    expect(result.total).toBe(80);
  });
});
