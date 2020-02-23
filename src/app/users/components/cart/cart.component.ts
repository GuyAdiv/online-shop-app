import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

    itemsInCart: Array<CartItem> = [];
    totalPrice: number;
    totalItems: number;
    private cartSubscription: Subscription;

    constructor(private cartService: CartService) { }

    async ngOnInit() {
        this.cartService.loadUserCart();
        this.cartSubscription = this.cartService.cartUpdated.subscribe(
            (cart) => {
                this.itemsInCart = cart.items;
                this.totalItems = cart.totalItems;
                this.totalPrice = cart.totalPrice;
            }
        );
    }

    async onDeleteProduct(cartItem: CartItem) {
        this.cartService.removeItemFromCart(cartItem.productId);
    }

    async setItemQty(cartItem: CartItem, amount: number) {
        this.cartService.setItemAmount(cartItem.productId, amount);
    }

    ngOnDestroy(): void {
        this.cartSubscription.unsubscribe();
    }
}
