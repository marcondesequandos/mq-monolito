import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceItems from "../../domain/entity/InvoiceItems";
import Invoice from "../../domain/entity/invoice";
import Address from "../../domain/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  private _invoiceRepository: InvoiceGateway;

  constructor(_invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = _invoiceRepository;
  }

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      document: input.document,
      address: new Address(
        input.street,
        input.number,
        input.complement,
        input.city,
        input.state,
        input.zipCode
      ),
      items: input.items.map((item) => {
        return new InvoiceItems({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
          createdAt: new Date(),
        });
      }),
    };

    //também demorei pra lembrar de usar o map ao invés do forEach que eu estava tentando anteriormente

    const invoice = new Invoice(props);

    this._invoiceRepository.generate(invoice);

    //fiquei travado um tempo e depois vi que não estava inicializando o a propriedade _items na entidade Invoice nem colocado o get items()

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: invoice.items.map((item: any) => {
        return {
          id: item.id.id,
          name: item.name,
          price: item.price,
        };
      }),
      total: invoice.total,
    };
  }
}
