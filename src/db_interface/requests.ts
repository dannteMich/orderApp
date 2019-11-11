import firebase from 'firebase/app';
import 'firebase/firestore';

import { Account, Seller, Product } from '../defs';

const firebaseConfig = {
    apiKey: "AIzaSyCMIEhXlCOq6WWEfU_95cOuNyuac2bzBaY",
    authDomain: "supplyanddemend.firebaseapp.com",
    databaseURL: "https://supplyanddemend.firebaseio.com",
    projectId: "supplyanddemend",
    storageBucket: "supplyanddemend.appspot.com",
    messagingSenderId: "1026500994003",
    appId: "1:1026500994003:web:7c135674169278a5f7c526",
    measurementId: "G-QM660NQZ6V"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const fetchAccount = (accountId: string) => {
    return Promise.all([
        db.collection('accounts').doc(accountId).get(),
        db.collection('accounts').doc(accountId).collection('sellers').get(),
    
    ]).then(([accountDoc, sellersSnapshot]) => {
        const sellers = [] as Seller[];
        sellersSnapshot.forEach(sellerDoc => {
            const seller = {
                ...sellerDoc.data(),
                products: [] as Product[],
            } as Seller;
            sellers.push(seller);
        })
        return {
            ...accountDoc.data(),
            sellers,
        } as Account;
    })
    
}

export const addSellerToAccount = (accountId: string, seller:Seller) => {
    //IMPR: check if a similar seller already exists or use the seller name as ID
    const {products, ...seller_without_products} = seller;
    return db.collection('accounts').doc(accountId)
        .collection('sellers').add(seller_without_products)
        .then(docRef => docRef.get())
        .then(docSnapshot => docSnapshot.exists);
}