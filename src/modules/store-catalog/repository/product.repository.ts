import ProductGateway from "../gateway/product.gateway";
import Product from "../domain/product.entity";
import ProductModel from "./product.model";
import Id from "../../@shared/domain/value-object/id.value-object";

export default class ProductRepository implements ProductGateway {
  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map(
      (product) =>
        new Product({
          id: new Id(product.id),
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        })
    );
  }
  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id } });

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }
}
