import {Measurement,Product, Seller} from './defs';
import * as firebase from 'firebase';

export const mockProducts: Product[] = [
    {
        name: "Apples",
        measurement: Measurement.GRAMS,
    },
    {
        name: "Pears",
        measurement: Measurement.GRAMS,
    },
    {
        name: "Milk",
        measurement: Measurement.UNITS,
    },
    {
        name: "Salmon Fish",
        measurement: Measurement.KG,
    },
    {
        name: "Soy souce",
        measurement: Measurement.PACKS,
    },
    {
        name: "Mushrooms",
        measurement: Measurement.PACKS,
    },
]

export const mockProducts2: Product[] = [
    {
        name: "Red Apples",
        measurement: Measurement.GRAMS,
    },
    {
        name: "Yellow Pears",
        measurement: Measurement.GRAMS,
    },
    {
        name: "Soy Milk",
        measurement: Measurement.UNITS,
    },
    {
        name: "Tuna Fish",
        measurement: Measurement.KG,
    },
    {
        name: "Tariaki souce",
        measurement: Measurement.PACKS,
    },
    {
        name: "Shrooms",
        measurement: Measurement.PACKS,
    },
]

export const seller1: Seller = {
    name: "Amit's Place",
    products: mockProducts,
}

export const seller2: Seller = {
    name: "Michael's Place",
    products: mockProducts2,
}

export const loadMockToFirestore = () => {
    const sellers = [seller1, seller2];
    const db = firebase.firestore();
    
    sellers.forEach(seller => {
        const {products, ...sellerInfo} = seller;
        db.collection('sellers').add(sellerInfo).then(sellerDocRef => {
            seller.products && seller.products.forEach(product => {
                sellerDocRef.collection('products').add(product)
            })
        })
    })
}

