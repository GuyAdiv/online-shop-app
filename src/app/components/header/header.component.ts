import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartService } from '../../users/services/cart.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    private cartSubscription: Subscription;
    cartItemsCount: number;

    constructor(
        private router: Router,
        private cartService: CartService,
        private authService: AuthService) { }

    ngOnInit() {
        this.cartSubscription = this.cartService.cartUpdated.subscribe(
            (cart) => {
                this.cartItemsCount = cart.totalItems;
            }
        );
    }

    ngOnDestroy() {
        this.cartSubscription.unsubscribe();
    }

    onLogout() {
        this.authService.logout();
        this.navigateLoginPage();
    }

    navigateLoginPage() {
        this.router.navigateByUrl('/login');
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }

}
