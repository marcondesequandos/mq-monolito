import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductRegistrationGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase implements UseCaseInterface {
  private _productRepository: ProductRegistrationGateway;

  constructor(_productRepository: ProductRegistrationGateway) {
    this._productRepository = _productRepository;
  }
  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this._productRepository.find(input.productId);

    return {
      productId: product.id.id,
      stock: product.stock,
    };
  }
}
