import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceItems from "../../domain/entity/InvoiceItems";
import Invoice from "../../domain/entity/invoice";
import Address from "../../domain/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
  //Eu quero poder encontras as Invoices geradas através de um id
  //Para isso preciso criar:
  //parâmetro privado repositório type Gateway (para ser inicializado)
  //constructor recebendo readonly parameter do repositório type Gateway (que diz o parâmetro a ser recebido pela classe)
  //inicialização do parâmetro da classe dentro do constructor da classe com o repositório recebido para poder ser utilizado depois no método execute
  //método execute recebe dados da requisição do repositório find ao procurar com dados do inputDto
  //retorna output esperado

  private _invoiceRepository: InvoiceGateway;
  constructor(private readonly invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }
  async execute(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this._invoiceRepository.find(input.id);

    const invoiceItems = invoice.items.map((item) => {
      return {
        id: item.id.id,
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
      };
    });

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoiceItems,
      total: invoice.total,
      createdAt: invoice.createdAt,
    };
  }
}
