import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUsecase implements UseCaseInterface {
  private _productRepository: ProductGateway;

  constructor(private readonly productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }

  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this._productRepository.find(input.id);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  }
}
