import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product-registration.entity";
import ProductRegistrationGateway from "../../gateway/product.gateway";
import {
  AddProductRegistrationInputDto,
  AddProductRegistrationOutputDto,
} from "./add-product.dto";

export default class AddProductRegistrationUseCase {
  private _productRepository: ProductRegistrationGateway;

  constructor(_productRepository: ProductRegistrationGateway) {
    this._productRepository = _productRepository;
  }
  async execute(
    input: AddProductRegistrationInputDto
  ): Promise<AddProductRegistrationOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    };
    const product = new Product(props);

    this._productRepository.add(product);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
