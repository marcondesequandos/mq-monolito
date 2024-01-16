import ProductRepository from "../repository/product.repository";
import ProductFacade from "../facade/product.facade";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const productFacade = new ProductFacade({
      addUseCase: addProductUseCase,
      stockUseCase: checkStockUseCase,
    });

    return productFacade;
  }
}
