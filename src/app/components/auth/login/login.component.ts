import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { CartService } from '../../../users/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    errorMsg: string;

    constructor(
        private authService: AuthService,
        private cartService: CartService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
    }

    navigateToHomePage() {
        this.router.navigate(['/'], { relativeTo: this.route});
    }

    async onLogin(loginForm: NgForm) {

        if (!loginForm.valid) {
            console.log(loginForm);
            return;
        }
        try {
            this.errorMsg = '';
            const username = loginForm.value.username;
            const password = loginForm.value.password;

            const result = await this.authService.userLogin(username, password);

            if (result) {
                console.log(result);
                this.cartService.loadUserCart();
                this.navigateToHomePage();
            }
        } catch (error) {
            console.log(error);
            this.errorMsg = error.error.message;
        }
    }
}
