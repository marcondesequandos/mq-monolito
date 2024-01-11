import RepositoryInterface from "../../@shared/repository/repository-interface";
import Product from "../domain/product.entity";

export default interface ProductRegistrationRepositoryInterface
  extends RepositoryInterface<Product> {}
