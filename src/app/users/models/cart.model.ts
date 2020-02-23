import { CartItem } from './cartItem.model';

interface ICartHashItem {
    [productId: string]: CartItem;
}

export class Cart {

    private cartItems: ICartHashItem = {};

    constructor() {

    }

    setItems(items: CartItem[]) {
        this.cartItems = {};
        items.forEach(item => {
            this.cartItems[item.productId] = item;
        });
    }

    addItem(item: CartItem) {
        if (this.cartItems[item.productId]) {
            this.cartItems[item.productId].qty++;
        } else {
            this.cartItems[item.productId] = item;
        }
    }

    removeItem(productId: string) {
        if (this.cartItems[productId]) {
            delete this.cartItems[productId];
        }
    }

    updateItem(productId: string, qty: number) {
        if (this.cartItems[productId] && qty > 0) {
            this.cartItems[productId].qty = qty;
        }
    }

    getItems(): CartItem[] {
        const items: CartItem[] = [];

        for (const productId in this.cartItems) {
            const item = this.cartItems[productId];
            items.push(item);
        }

        return items;
    }

    calcTotalPrice(): number {
        let sum = 0;

        for (const productId in this.cartItems) {
            const item = this.cartItems[productId];
            sum += item.price * item.qty;
        }

        return sum;
    }

    calcTotalItems(): number {
        let sum = 0;

        for (const productId in this.cartItems) {
            const item = this.cartItems[productId];
            sum += item.qty;
        }

        return sum;
    }
}
