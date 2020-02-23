import { Component,
    OnInit,
    Output,
    EventEmitter } from '@angular/core';

import { ProductService } from '../../products/services/product.service';
import { ProductFilter } from '../../products/models/productFilter.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @Output() onSearch: EventEmitter<string> = new EventEmitter();
    keyword = 'name';
    data = [];
    search: any;
    inputSearch: HTMLElement;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.data = [];
        this.inputSearch = document.querySelector('.ng-autocomplete .autocomplete-container .input-container input');
        this.inputSearch.onkeypress = (event) => {
            if (event.key === 'Enter') {
                this.onBtnSearchClick();
            }
        };
    }

    onChangeSearch(val: string) {
        const filter = new ProductFilter(val, true);
        this.productService.getProducts(filter).subscribe(
            (result) => {
               if (result.products) {
                   this.data = result.products.map(item => {
                       return { id: item.id, name: item.name };
                   });
               }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onFocused(e) {
    // do something when input is focused
    }

    onBtnSearchClick() {
        if (!this.search) {
            this.search = '';
        }
        const search = this.search.name || this.search;
        this.onSearch.emit(search);
    }
}
