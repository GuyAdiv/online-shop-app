import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProductFilter, ProductSortBy } from '../../models/productFilter.model';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit {

    @Output() onFilter: EventEmitter<ProductFilter> = new EventEmitter();
    filter: ProductFilter = new ProductFilter();
    productSortBy = new ProductSortBy();
    selectedSort: {key: string, value: string};

    constructor() { }

    ngOnInit() {
        console.log(this.productSortBy.AvgCustomerReview);
    }

    onSearch(search: string) {
        this.filter.search = search;
        this.onFilter.emit(this.filter);
    }

    sortBy(sort: {key: string, value: string}) {
        console.log(sort);
        this.selectedSort = sort;
        this.filter.sortBy = sort.value;
        this.onFilter.emit(this.filter);
    }

    clearSort() {
        if (this.selectedSort) {
            this.selectedSort = undefined;
            this.filter.sortBy = undefined;
            this.onFilter.emit(this.filter);
        }
    }
}
