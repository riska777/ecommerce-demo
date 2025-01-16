import { Product } from "./product.interface";

export interface AddToCartEventInterface {
  product: Product;
  quantity: number;
}