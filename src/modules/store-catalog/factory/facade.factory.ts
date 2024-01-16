import ProductRepository from "../repository/product.repository";
import StoreCatalogFacade from "../facade/store-catalog.facade";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";

export default class StoreCatalogFacadeFactory {
  static create() {
    const storeCatalogRepository = new ProductRepository();
    const findAllProductsUseCase = new FindAllProductsUsecase(
      storeCatalogRepository
    );
    const findProductUseCase = new FindProductUsecase(storeCatalogRepository);
    const addProductUseCase = new AddProductUseCase(storeCatalogRepository);

    const storeCatalogFacade = new StoreCatalogFacade({
      addUseCase: addProductUseCase,
      findUseCase: findProductUseCase,
      findAllUseCase: findAllProductsUseCase,
    });

    return storeCatalogFacade;
  }
}
