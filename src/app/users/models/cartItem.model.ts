export class CartItem {
    productId: string;
    name: string;
    price: number;
    qty: number;

    constructor(
        productId: string,
        name: string,
        price: number,
        qty: number = 1
        ) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.qty = qty;
    }
}
