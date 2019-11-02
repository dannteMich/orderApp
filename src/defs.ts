export enum Measurement {
    UNITS = "units",
    GRAMS = "grams",
    KG =  "kg",
    PACKS = "packs",
} 

export interface Product {
    name: string;
    measurement: Measurement;
}


export interface Order {
    product: Product;
    amount: number;
}

export type EditableOrder = Partial<Order>;


export interface Seller {
    name: string;
    mobile?: string;
    email?: string;
    products?: Product[];
}
