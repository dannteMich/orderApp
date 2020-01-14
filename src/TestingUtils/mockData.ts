import {Measurement,Product, Seller, Account} from '../defs';

export const mockUser = {
    email: "dannte@gmail.com"
};

export const mockProducts: Product[] = [
    {
        id: "Apples",
        name: "Apples",
        measurement: Measurement.GRAMS,
    },
    {
        id: "Pears",
        name: "Pears",
        measurement: Measurement.GRAMS,
    },
    {
        id: "Milk",
        name: "Milk",
        measurement: Measurement.UNITS,
    },
    {
        id: "Salmon Fish",
        name: "Salmon Fish",
        measurement: Measurement.KG,
    },
    {
        id: "Soy souce",
        name: "Soy souce",
        measurement: Measurement.PACKS,
    },
    {
        id: "Mushrooms",
        name: "Mushrooms",
        measurement: Measurement.PACKS,
    },
    {
        id: "apples - green",
        name: "apples - green",
        measurement: Measurement.GRAMS,
    },
]

export const mockProducts2: Product[] = [
    {
        id: "Red Apples",
        name: "Red Apples",
        measurement: Measurement.GRAMS,
    },
    {
        id: "Yellow Pears",
        name: "Yellow Pears",
        measurement: Measurement.GRAMS,
    },
    {
        id: "Soy Milk",
        name: "Soy Milk",
        measurement: Measurement.UNITS,
    },
    {
        id: "Tuna Fish",
        name: "Tuna Fish",
        measurement: Measurement.KG,
    },
    {
        id: "Tariaki souce",
        name: "Tariaki souce",
        measurement: Measurement.PACKS,
    },
    {
        id: "Shrooms",
        name: "Shrooms",
        measurement: Measurement.PACKS,
    },
]

export const seller1: Seller = {
    name: "Amit's Place",
    products: mockProducts.reduce((sum: {[productId: string]: Product}, product: Product) => {
        sum[product.id] = product;
        return sum;
    }, {}),
    email: 'mail@mail.com',
    id: "seller1",
}

export const seller2: Seller = {
    name: "Michael's Place",
    id: "seller2",
    products: mockProducts2.reduce((sum: { [productId: string]: Product }, product: Product) => {
        sum[product.id] = product;
        return sum;
    }, {}),
}


export const DEV_ACCOUNT_NAME = 'dev_account'

export const account1: Account = {
    name: DEV_ACCOUNT_NAME,
    owner: "michael@someMail.com",
    managers: [],
    members: ["Amit"],
    id: 'mockAccount'
}

export const account2: Account = {
    name: "mock_2",
    owner: "michael@someMail.com",
    managers: ['Michael'],
    members: [],
    id: 'mockAccount2'
}