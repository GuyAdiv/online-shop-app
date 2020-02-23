import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductComponent } from './products/components/product/product.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { ProductsListComponent } from './products/components/products-list/products-list.component';
import { ProductsFilterComponent } from './products/components/products-filter/products-filter.component';
import { ProductService } from './products/services/product.service';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SearchComponent } from './components/search/search.component';

import { CartComponent } from './users/components/cart/cart.component';
import { CartService } from './users/services/cart.service';
import { NotFoundErrorComponent } from './components/not-found-error/not-found-error.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

import { AuthService } from './components/auth/services/auth.service';
import { AuthGuard } from './components/auth/services/auth-guard.service';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductsListComponent,
    ProductsFilterComponent,
    HeaderComponent,
    LoginComponent,
    LoaderComponent,
    SearchComponent,
    CartComponent,
    NotFoundErrorComponent,
    StarRatingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AutocompleteLibModule
  ],
  providers: [ProductService, CartService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
