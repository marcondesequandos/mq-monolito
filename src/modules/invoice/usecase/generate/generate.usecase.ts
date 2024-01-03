import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import { GenerateInvoiceUseCaseInputDto } from "./generate.usecase.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<any> {
    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      document: input.document,
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
      items: input.items,
    };

    // verificar como o endereço vai entrar
  }
}
