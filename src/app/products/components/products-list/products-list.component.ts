import { Component, OnInit, HostListener } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductResult } from '../../models/productResult.model';
import { ProductFilter } from '../../models/productFilter.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

    products: Array<Product> = [];
    productsLoaded: boolean;
    currentPage = 1;
    totalItems = 0;
    private productFilter = new ProductFilter();

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.fetchProducts();
    }

    private loadProducts(funcResult: Function) {
        this.productsLoaded = false;
        this.productService.getProducts(this.productFilter).subscribe(
            (result) => {
                console.log(result.products);
                this.totalItems = result.totalItems;
                funcResult(result);
                this.productsLoaded = true;
            },
            (error) => {
                console.log(error);
                this.productsLoaded = true;
            }
        );
    }

    fetchProducts(filter: ProductFilter = undefined) {
        if (filter) {
            this.productFilter.search = filter.search;
            this.productFilter.sortBy = filter.sortBy;
        }
        this.productFilter.page = 1;
        this.loadProducts((result: ProductResult) => {
            this.products = result.products;
        });
    }

    appendProducts() {
        this.productFilter.page++;
        this.loadProducts((result: ProductResult) => {
            this.products = this.products.concat(result.products);
        });
    }

    @HostListener('window:scroll', ['$event']) onScroll() {

        const isAllLoaded = this.totalItems === this.products.length;

        if (!this.productsLoaded || isAllLoaded) {
            return;
        }

        const pos = document.documentElement.clientHeight + document.documentElement.scrollTop;
        const max = document.documentElement.offsetHeight;

        if (pos === max) {
            this.appendProducts();
        }
    }

}
