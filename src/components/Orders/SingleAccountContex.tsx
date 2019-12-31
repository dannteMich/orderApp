import React, { useState } from 'react';

import { Seller, Product} from '../../defs';
import firebase from '../../commonLogical/firebase';

import LoadingBlob from '../../commonComponents/LoadingBlob';


export const SingleAccountContext = React.createContext({
    sellers: [] as Seller[], // IMPR later this should be a whole account
})

const db = firebase.firestore();


interface Props {
    accountId: string;
}

const SingleAccountContextProvider: React.FC<Props> = ({accountId, children}) => {
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
                products: [] as Product[],
                ...sellerDoc.data()
            };
            productsQuery.forEach(productDoc => {
                seller.products.push({
                    id: productDoc.id,
                    ...productDoc.data(),
                } as Product)
            })
            return seller as Seller;
        })
    }

    if (!sellers) {
        accountDoc().collection('sellers').get().then(sellersQuery => {
            const sellersRequests = [] as Promise<Seller>[];
            sellersQuery.forEach(sellerDoc => sellersRequests.push(getFullSellerPromise(sellerDoc.id)));
            Promise.all(sellersRequests).then(sellersFromDb => setSellers(sellersFromDb));
        })

        return <LoadingBlob topMessage="Loading Sellers and Products for account..." />
    }
    
    
    return <SingleAccountContext.Provider value={{sellers: sellers}}>
        {children}
    </SingleAccountContext.Provider>
}

export default SingleAccountContextProvider;