import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 100,
    };
    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: { id: productProps.id.id },
    });

    expect(productProps.id.id).toEqual(productDb.id);
    expect(productProps.name).toEqual(productDb.name);
    expect(productProps.description).toEqual(productDb.description);
    expect(productProps.salesPrice).toEqual(productDb.salesPrice);
  });

  it("should find all products", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
    });

    const productRepository = new ProductRepository();
    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].id.id).toBe("1");
    expect(products[0].name).toBe("Product 1");
    expect(products[0].description).toBe("Description 1");
    expect(products[0].salesPrice).toBe(100);
    expect(products[1].id.id).toBe("2");
    expect(products[1].name).toBe("Product 2");
    expect(products[1].description).toBe("Description 2");
    expect(products[1].salesPrice).toBe(200);
  });

  it("should find a product", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });

    const productRepository = new ProductRepository();
    const product = await productRepository.find("1");

    expect(product).toBeDefined();
    expect(product.id.id).toBe("1");
    expect(product.name).toBe("Product 1");
    expect(product.description).toBe("Description 1");
    expect(product.salesPrice).toBe(100);
  });
});
