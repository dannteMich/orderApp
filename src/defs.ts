
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
}


// Seller
export interface NewSeller {
    name: string;
    whatsapp?: string;
    email?: string;
    
}

export interface Seller extends NewSeller {
    products: {
        [productId: string]: Product;
    };
    id: string;
}

export interface sellersMapping {
    [sellerId: string]: Seller;
};


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
export interface SingleProductOrder extends Product {
    amount: number;
    sellerId: string;   // TODO: not sure I will need this
}

export interface SingleSellerOrder {
    [productId: string ]: SingleProductOrder;
}

export interface Order {
    [sellerId: string]: SingleSellerOrder
}



// Orders in the DB
export interface DbOrderItem {
    productId: string;
    sellerId: string;
    amount: number;
}

export type DbOrder = DbOrderItem[];


export interface SavedOrder extends DbOrder {
    name: string;
}

export interface PlacedOrder extends DbOrder {
    datePlaced: Date;
}