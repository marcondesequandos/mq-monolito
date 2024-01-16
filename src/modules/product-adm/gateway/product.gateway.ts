import Product from "../domain/product.entity";

//interface que fala os métodos para falar com módulos externos banco de dados etc
// implementamos um repositório que fala com o mundo externo implementando esse gateway

export default interface ProductGateway {
  add(product: Product): Promise<void>;
  find(id: string): Promise<Product>;
}
