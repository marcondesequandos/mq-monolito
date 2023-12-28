import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutPutDto,
} from "./client-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  findUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addUsecase: UseCaseInterface;
  private _findUsecase: UseCaseInterface;

  constructor(usecasesProps: UseCaseProps) {
    this._addUsecase = usecasesProps.addUseCase;
    this._findUsecase = usecasesProps.findUseCase;
  }
  addClient(input: AddClientFacadeInputDto): Promise<void> {
    return this._addUsecase.execute(input);
  }
  findClient(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutPutDto> {
    return this._findUsecase.execute(input);
  }
}
