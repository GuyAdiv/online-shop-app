import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProductResult } from '../models/productResult.model';
import { Product } from '../models/product.model';
import { ProductFilter } from '../models/productFilter.model';

@Injectable()
export class ProductService {

    private url = 'http://localhost:8080/api/products';
    private counter: number;

    constructor(private http: HttpClient) {
        this.counter = 0;
    }

    getProducts(filter: ProductFilter) {
        let url = this.url;
        const urlQuery = filter.getUrlQuery();
        url += '?' + urlQuery;
        console.log(url);

        return this.http.get<ProductResult>(url);
    }

    getProduct(id: string) {
        this.counter++;
        console.log('product visits:', this.counter);
        const url = this.url.concat('/', id);
        return this.http.get<Product>(url);
    }
}
