import { Product } from './product.model';

export class ProductResult {
    products: Array<Product>;
    totalItems: number;

    constructor(
        products: Array<Product>,
        totalItems: number
        ) {
        this.products = products;
        this.totalItems = totalItems;
    }
}
