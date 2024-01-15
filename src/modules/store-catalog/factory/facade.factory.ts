import ProductRepository from "../../infrastructure/product/repository/sequelize/product.repository";
import StoreCatalogFacade from "../facade/store-catalog.facade";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
  static create() {
    const storeCatalogRepository = new ProductRepository();
    const findAllProductsUseCase = new FindAllProductsUsecase(
      storeCatalogRepository
    );
    const findProductUseCase = new FindProductUsecase(storeCatalogRepository);
    const storeCatalogFacade = new StoreCatalogFacade({
      findUseCase: findProductUseCase,
      findAllUseCase: findAllProductsUseCase,
    });

    return storeCatalogFacade;
  }
}
