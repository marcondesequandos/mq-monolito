import ProductRegistrationRepository from "../../infrastructure/product-registration/product-registration.repository";
import ProductRegistrationFacade from "../facade/product-registration.facade";
import AddProductRegistrationUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductRegistrationFacadeFactory {
  static create() {
    const productRepository = new ProductRegistrationRepository();
    const addProductUseCase = new AddProductRegistrationUseCase(
      productRepository
    );
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const productRegistrationFacade = new ProductRegistrationFacade({
      addUseCase: addProductUseCase,
      stockUseCase: checkStockUseCase,
    });

    return productRegistrationFacade;
  }
}
