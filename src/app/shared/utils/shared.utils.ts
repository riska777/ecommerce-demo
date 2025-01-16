import { CartItem } from "../../cart/interfaces/cart-item.interface";
import { Product } from "../../products/interfaces/product.interface";

export namespace SharedUtils {
  export function trackById(index: number, product: Product | CartItem): string {
    return product.id;
  }
}
