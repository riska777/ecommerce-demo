import { Product } from "../../products/interfaces/product.interface";

export interface CartItem extends Product {
  quantity: number;
}