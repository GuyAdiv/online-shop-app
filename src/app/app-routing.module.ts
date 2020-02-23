import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './components/auth/services/auth-guard.service';

import { ProductsListComponent } from './products/components/products-list/products-list.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CartComponent } from './users/components/cart/cart.component';
import { NotFoundErrorComponent } from './components/not-found-error/not-found-error.component';

const routes: Routes = [
    {path: '', component: ProductsListComponent},
    {path: 'products/:id', component: ProductDetailsComponent},
    {path: 'products/:id/404', component: NotFoundErrorComponent },
    {path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    {path: 'login', component: LoginComponent},
    {path: '**', component: NotFoundErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
