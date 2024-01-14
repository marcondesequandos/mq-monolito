import Id from "../../@shared/domain/value-object/id.value-object";
import ProductRegistration from "../../product-registration/domain/product-registration.entity";
import ProductRegistrationGateway from "../../product-registration/gateway/product.gateway";
import { ProductRegistrationModel } from "./product-registration.model";

export default class ProductRegistrationRepository
  implements ProductRegistrationGateway
{
  async add(product: ProductRegistration): Promise<void> {
    await ProductRegistrationModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  async find(id: string): Promise<ProductRegistration> {
    const product = await ProductRegistrationModel.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return new ProductRegistration({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }
}
