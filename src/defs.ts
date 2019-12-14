
// Products
export enum Measurement {
    UNITS = "units",
    GRAMS = "grams",
    KG =  "kg",
    PACKS = "packs",
    BOTTLES = "bottles",
} 

export interface NewProduct {
    name: string;
    measurement: Measurement;
}

export interface Product extends NewProduct {
    id: string;
    sellerId?: string; // TODO: later should be mandatory
}


// Seller
export interface NewSeller {
    name: string;
    whatsapp?: string;
    email?: string;
    
}

export interface Seller extends NewSeller {
    products: Product[];
    id: string;
}


// Account
export interface NewAccount {
    name: string;
    owner: string;
}

export interface Account extends NewAccount {
    managers: string[];    
    members: string[];  
    id: string;
}


// Orders
export interface OrderItem {
    productId: string;
    sellerId: string;
    amount: number;
}

export interface Order {
    items: OrderItem[];
}

export interface SavedOrder extends Order {
    name: string;
}

export interface PlacedOrder extends Order {
    datePlaced: Date;
}