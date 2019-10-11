export enum Measurement {
    UNITS = "units",
    GRAMS = "grams",
    KG =  "kg",
    PACKS = "packs",
} 

export interface Product {
    name: string;
    measurement?: Measurement; // TODO: later this should be obligatory
}

export interface Order { // TODO: this should be a mapping and product should be "hushable"
    product: Product;
    amount: number;
}