import React, {useState, useContext} from 'react'

import {currentAccountIdContext} from '../../commonLogical/contexts';
import firebase from '../../commonLogical/firebase';
import {NewSeller, Product, NewProduct, Measurement} from '../../defs';

import SellerViewComponent from './SellerViewComponent';
import LoadingComponent from '../../commonComponents/LoadingBlob';
import LoadingBlob from '../../commonComponents/LoadingBlob';

const db = firebase.firestore();



interface Props {
    sellerId: string;
}

const SellerViewContainer: React.FC<Props> = ({sellerId}) => {
    const {currentAccountId} = useContext(currentAccountIdContext);
    const [seller, setSeller] = useState<NewSeller>();
    const [products, setProducts] = useState<Array<Product>>();

    const getSellerDoc = () => db.collection('accounts').doc(currentAccountId)
        .collection('sellers').doc(sellerId);

    const addProductPromise = (product: NewProduct) => {
        return getSellerDoc().collection('products').add(product)
            .then(newProductDoc => newProductDoc.id ? true : false);
    }
    
    const deleteSellerPromise = () => {
        return getSellerDoc().delete();
    }

    const deleteProductPromise = (productId: string) => {
        if (!productId) {
            throw Error('No product corresponding to this ID');
        }
        return getSellerDoc().collection('products').doc(productId).delete();
    }

    const validateProduct = (product: Partial<NewProduct>) => {
        const { name, measurement } = product;
        if (!measurement || !Object.values(Measurement).includes(measurement)) {
            throw Error("Measurement is not set to a legal value")
        }
        if (!name || name === "") {
            throw Error("Name is not set to a legal value")
        }
    }

    if (!currentAccountId) {
        return <LoadingBlob />
    }

    if (!seller) {
        getSellerDoc().onSnapshot(doc => setSeller(doc.data() as NewSeller));
        return <LoadingComponent />
    
    } else if (!products) {
        getSellerDoc().collection('products').onSnapshot(collection => {
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
        return <SellerViewComponent 
            seller={{...seller, products, id: sellerId}} 
            validateProduct={validateProduct}
            handleAddProduct={addProductPromise}
            handleDeleteProduct={deleteProductPromise}
            handleDeleteSeller={deleteSellerPromise}
        />   
    }
}

export default SellerViewContainer;