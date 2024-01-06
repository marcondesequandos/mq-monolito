import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, {
  FindInvoiceFacadeOutputDto,
  FindInvoiceInputDto,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto,
} from "./invoice-facade.interface";

export interface UseCaseProps {
  generateUseCase: UseCaseInterface;
  findUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _generateUseCase: UseCaseInterface;
  private _findUseCase: UseCaseInterface;

  constructor(usecasesProps: UseCaseProps) {
    this._generateUseCase = usecasesProps.generateUseCase;
    this._findUseCase = usecasesProps.findUseCase;
  }

  generateInvoice(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    return this._generateUseCase.execute(input);
  }

  findInvoice(input: FindInvoiceInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return this._findUseCase.execute(input);
  }
}
