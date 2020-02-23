import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../../users/services/cart.service';
import { AuthService } from '../../../components/auth/services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

    product: Product;

    constructor(
        private authService: AuthService,
        private productService: ProductService,
        private cartService: CartService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                const productId = params['id'];
                console.log(productId);
                this.productService.getProduct(productId).subscribe(
                    (product) => {
                        this.product = product;
                    },
                    (error) => {
                        console.log(error);
                        if (error.status === 404) {
                            this.router.navigate(['/products/:id/404'.replace(':id', productId)]);
                        }
                        console.log(error.status);
                    }
                );
            }
        );
    }

    addProductToCart() {
        if (this.authService.isAuthenticated()) {
            this.cartService.addItemToCart(this.product);
        } else {
            this.router.navigateByUrl('/login');
        }
    }

}
