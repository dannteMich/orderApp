export enum Measurement {
    UNITS = "units",
    GRAMS = "grams",
    KG =  "kg",
    PACKS = "packs",
} 

export interface Product {
    name: string;
    id?: string;
    measurement: Measurement;
}


export interface Seller {
    name: string;
    products: Product[];
    whatsapp?: string;
    email?: string;
    id?: any;
}
export type SellerWithoutProducts = Omit<Seller, 'products'>;

export interface Account {
    name: string;
    manager: string;    // IMPR: this will a user later 
    members: string[];  // IMPR: this will an array of users later 
    sellers: Seller[];
    id?: any;
}
export type AccountWithoutSellers = Omit<Account, 'sellers'>;



export interface Order {
    product: Product;
    amount: number;
}
export type EditableOrder = Partial<Order>;