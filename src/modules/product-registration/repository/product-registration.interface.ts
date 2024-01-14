import RepositoryInterface from "../../@shared/repository/repository-interface";
import ProductRegistration from "../domain/product-registration.entity";

export default interface ProductRegistrationRepositoryInterface
  extends RepositoryInterface<ProductRegistration> {}
