export enum Measurement {
    UNITS = "units",
    GRAMS = "grams",
    KG =  "kg",
    PACKS = "packs",
} 

export interface NewProduct {
    name: string;
    measurement: Measurement;
}

export interface Product extends NewProduct {
    id: string;
    sellerId?: string; // TODO: later should be mandatory
}


export interface NewSeller {
    name: string;
    whatsapp?: string;
    email?: string;
    
}

export interface Seller extends NewSeller {
    products: Product[];
    id: string;
}

export interface Account {
    name: string;
    manager: string;    // IMPR: this will a user later 
    members: string[];  // IMPR: this will an array of users later 
    sellers: Seller[];
    id?: string;
}
export type AccountWithoutSellers = Omit<Account, 'sellers'>;



export interface Order {
    product: Product;
    amount: number;
}
export type EditableOrder = Partial<Order>;