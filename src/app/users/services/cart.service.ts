import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { CartItem } from '../models/cartItem.model';
import { Cart } from '../models/cart.model';
import { Product } from '../../products/models/product.model';
import { AuthService } from '../../components/auth/services/auth.service';

@Injectable()
export class CartService {

    private url = 'http://localhost:8080/api/cart';
    private cart: Cart = new Cart();
    cartUpdated = new Subject<{items: CartItem[], totalItems: number, totalPrice: number}>();

    constructor(private http: HttpClient, private authService: AuthService) {

    }

    async loadUserCart() {
        try {
            const items = await this.http.get<Array<CartItem>>(this.url, {
                headers: {
                    Authorization: this.authService.getUserToken()
                }
            }).toPromise();

            console.log(items);
            this.cart.setItems(items);
            this.userCartUpdated();

            return items;
        } catch (error) {
            console.log(error);
        }
    }

    async addItemToCart(product: Product) {
        try {
            const cartItem = new CartItem(
                product.id,
                product.name,
                product.price
            );

            const result = await this.http.post(this.url, cartItem, {
                headers: {
                    Authorization: this.authService.getUserToken()
                }
            }).toPromise();

            this.cart.addItem(cartItem);
            this.userCartUpdated();

            return result;

        } catch (error) {
            console.log(error);
        }
    }

    async removeItemFromCart(productId: string) {
        try {
            const url = this.url.concat('/', productId);
            const result = await this.http.delete(url, {
                headers: {
                    Authorization: this.authService.getUserToken()
                }
            }).toPromise();

            this.cart.removeItem(productId);
            this.userCartUpdated();

            return result;

        } catch (error) {
            console.log(error);
        }
    }

    async setItemAmount(productId: string, amount: number) {
        try {
            const result = await this.http.patch(
                this.url,
                {
                    productQty: amount,
                    productId
                },
                {
                    headers: {
                        Authorization: this.authService.getUserToken()
                    }
                }).toPromise();

            console.log(result);
            this.cart.updateItem(productId, amount);
            this.userCartUpdated();
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    private userCartUpdated() {
        const data = {
            items: this.cart.getItems(),
            totalItems: this.cart.calcTotalItems(),
            totalPrice: this.cart.calcTotalPrice()
        };

        this.cartUpdated.next(data);
    }
}
