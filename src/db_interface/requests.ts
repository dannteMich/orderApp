import firebase from 'firebase/app';
import 'firebase/firestore';
import {seller1} from '../mockData'; // FIXME: should not be mock
// IMPR: add firebse auth and other parts later

import { Account, Seller } from '../defs';

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
    return db.collection('accounts').doc(accountId)
        .get().then(doc => {
            const account = doc.data();
            if (!account) {
                throw Error(`no account with id {accountId}`)
            }

            return ({
                sellers: [] as Seller[],
                ...account
            }) as Account;
        })
}

export const addSellerToAccount = (accountId: string, seller:Seller) => {
    //IMPR: check if a simial seller already exists or use the seller name as ID
    const {products, ...seller_without_products} = seller;
    return db.collection('accounts').doc(accountId)
        .collection('sellers').add(seller_without_products);
}