import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, {
  AddProductFacadeInputDto,
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
} from "./store-catalog.facade.interface";

export interface UseCaseProps {
  addUseCase: AddProductUseCase;
  findUseCase: FindProductUsecase;
  findAllUseCase: FindAllProductsUsecase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _addProductUseCase: UseCaseInterface;
  private _findAllUseCase: UseCaseInterface;
  private _findUseCase: UseCaseInterface;

  constructor(props: UseCaseProps) {
    this._addProductUseCase = props.addUseCase;
    this._findUseCase = props.findUseCase;
    this._findAllUseCase = props.findAllUseCase;
  }

  async add(input: AddProductFacadeInputDto): Promise<void> {
    return this._addProductUseCase.execute(input);
  }

  async find(
    input: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto> {
    return this._findUseCase.execute(input);
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return this._findAllUseCase.execute();
  }
}
