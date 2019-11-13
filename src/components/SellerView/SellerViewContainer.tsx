import React, {useState, useContext} from 'react'

import {AccountIdContext} from '../../commonLogical/contexts';
import firebase from '../../commonLogical/firebase';
import {Seller, Product} from '../../defs';

import SellerViewComponent from './SellerViewComponent';
import LoadingComponent from '../../commonComponents/LoadingBlob';

const db = firebase.firestore();

interface Props {
    sellerId: string;
}

const SellerViewContainer: React.FC<Props> = ({sellerId}) => {
    const accountId = useContext(AccountIdContext);
    const [seller, setSeller] = useState<Seller>();
    const [products, setProducts] = useState<Array<Product>>();

    if (!seller) {
        db.collection('accounts').doc(accountId)
            .collection('sellers').doc(sellerId).onSnapshot(doc => {
                const newSeller = {
                    ...doc.data(),
                    id: doc.id,
                    products: [] as Array<Product>,
                } as Seller;
                setSeller(newSeller);
            })
        return <LoadingComponent />
    } else if (!products) {
        db.collection('accounts').doc(accountId).collection('sellers')
            .doc(sellerId).collection('products').onSnapshot(collection => {
                const newProducts = [] as Product[];
                collection.forEach(doc => {
                    newProducts.push({
                        ...doc.data(),
                        id: doc.id
                    } as Product);
                })
                setProducts(newProducts);
            })
        return <LoadingComponent />
    } else {
        return <SellerViewComponent {...seller as Seller} products={products} />   
    }
}

export default SellerViewContainer;