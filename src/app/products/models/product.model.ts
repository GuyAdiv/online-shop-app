export class Product {
    id: string;
    name: string;
    manufacturer: string;
    price: number;
    reviewsCount: number;
    rating: number;
    description: string;
    information: string;
    product_description: string;

    constructor(
        id: string,
        name: string,
        manufacturer: string,
        price: number,
        reviewsCount: number,
        rating: number,
        description: string,
        information: string,
        product_description: string
        ) {
        this.id = id;
        this.name = name;
        this.manufacturer = manufacturer;
        this.price = price;
        this.reviewsCount = reviewsCount;
        this.rating = rating;
        this.description = description;
        this.information = information;
        this.product_description = product_description;
    }
}
