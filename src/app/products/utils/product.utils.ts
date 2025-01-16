import { Product } from '../interfaces/product.interface';

export namespace ProductUtils {
  export function availableAmountToStockLabel(product: Product): string {
    if (product.availableAmount === undefined) {
      return 'Out of stock';
    }
    if (product.availableAmount === 0) {
      return 'Out of stock';
    }
    if (product.availableAmount < 100) {
      return 'Low stock';
    }
    if (product.availableAmount >= 100) {
      return 'In stock';
    }
    return 'Out of stock';
  }

  export function getSeverity(
    product: Product
  ): 'success' | 'warn' | 'danger' | undefined {
    if (product.availableAmount === undefined) {
      return undefined;
    }
    if (product.availableAmount < 100) {
      return 'warn';
    }
    if (product.availableAmount === 0) {
      return 'danger';
    }
    if (product.availableAmount >= 100) {
      return 'success';
    }
    return;
  }
}
