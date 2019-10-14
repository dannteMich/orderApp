export enum Measurement {
    UNITS = "units",
    GRAMS = "grams",
    KG =  "kg",
    PACKS = "packs",
} 

export interface Product {
    name: string;
    measurement: Measurement;
    seller?: Seller; // TODO: this should not be optional
}


export interface Order {
    product: Product;
    amount: number;
}

export type EditableOrder = Partial<Order>;

export interface Seller {
    name: string;
}
