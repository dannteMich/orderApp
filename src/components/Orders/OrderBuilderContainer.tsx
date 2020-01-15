import React, { useState } from 'react';

import { Seller, Product, DbOrder} from '../../defs';
import firebase from '../../commonLogical/firebase';

import LoadingBlob from '../../commonComponents/LoadingBlob';
import OrderBuilderComponent from './OrderBuilderComponent';


const db = firebase.firestore();


interface Props {
    accountId: string;
}

const OrderBuilderContainer: React.FC<Props> = ({accountId}) => {
    const [sellers, setSellers] = useState<Seller[]>();

    const accountDoc = () => db.collection('accounts').doc(accountId);
    const sellerDoc = (sellerId: string) => accountDoc().collection('sellers').doc(sellerId);
    const getFullSellerPromise = (sellerId: string) => {
        return Promise.all([
            sellerDoc(sellerId).get(),
            sellerDoc(sellerId).collection('products').get()
        ]).then(([sellerDoc, productsQuery]) => {
            const seller = {
                id: sellerDoc.id,
                products: {},
                ...sellerDoc.data()
            } as Seller;
            productsQuery.forEach(productDoc => {
                seller.products[productDoc.id] = {
                    id: productDoc.id,
                    ...productDoc.data(),
                } as Product;
            })
            return seller as Seller;
        })
    }

    const saveCurrentOrderPromise = (order: DbOrder) => {
        return accountDoc().collection('orders').doc('current').set({
            order
        });
    }

    if (!sellers) {
        accountDoc().collection('sellers').get().then(sellersQuery => {
            const sellersRequests = [] as Promise<Seller>[];
            sellersQuery.forEach(sellerDoc => sellersRequests.push(getFullSellerPromise(sellerDoc.id)));
            Promise.all(sellersRequests).then(sellersFromDb => setSellers(sellersFromDb));
        })

        return <LoadingBlob topMessage="Loading Sellers and Products..." />
    }
    
    const sellersMap = sellers.reduce((sum: {[sellerId: string]: Seller}, seller: Seller) => {
        sum[seller.id] = seller;
        return sum;
    }, {})
    return <OrderBuilderComponent sellersMap={sellersMap} handleSaveOrder={saveCurrentOrderPromise} />
}

export default OrderBuilderContainer;