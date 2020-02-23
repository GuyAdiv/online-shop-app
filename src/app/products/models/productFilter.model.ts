export class ProductSortBy {
    PriceLowToHigh = { key: 'Price: Low to High', value: 'PriceLowToHigh' };
    PriceHighToLow = { key: 'Price: High to Low', value: 'PriceHighToLow' };
    AvgCustomerReview = { key: 'Avg. Customer Review', value: 'AvgCustomerReview' };

    constructor() {

    }
}

export class ProductFilter {
    search: string;
    namesOnly: boolean;
    page: number;
    sortBy: string;
    constructor(
        search: string = undefined,
        namesOnly: boolean = false,
        page: number = 1,
        sortBy: string = undefined
        ) {
        this.search = search;
        this.namesOnly = namesOnly;
        this.page = page;
        this.sortBy = sortBy;
    }

    getUrlQuery() {
        const params = [];

        if (this.search && this.search.trim().length) {
            params.push('search=' + this.search);
        }
        if (this.namesOnly) {
            params.push('namesOnly=' + this.namesOnly.toString());
        }
        if (this.sortBy) {
            params.push('sort=' + this.sortBy);
        }
        params.push('page=' + this.page.toString());

        const urlParams = params.join('&');

        return urlParams;
    }
}
