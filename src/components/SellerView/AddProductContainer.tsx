
import React, {useContext} from 'react';

import firebase from '../../commonLogical/firebase'
import {Product, Measurement} from '../../defs';
import {AccountIdContext} from '../../commonLogical/contexts';

import AddProductComponent from './AddProductComponent';


const validateProduct = (product: Partial<Product>) => {
    const {name, measurement} = product;
    if (!measurement || !Object.values(Measurement).includes(measurement)) {
        throw Error("Measurement is not set to a legal value")
    }
    if (!name || name === "") {
        throw Error("Name is not set to a legal value")
    }
}

interface Props {
    sellerId: any;
}

const AddProductContainer: React.FC<Props> = ({sellerId}) => {
    const accountId = useContext(AccountIdContext);

    const addProductPromise = (product: Product) => {
        return firebase.firestore().collection('accounts').doc(accountId)
            .collection('sellers').doc(sellerId).collection('products').add(product)
            .then(newProductDoc => newProductDoc.id ? true : false );
    }
    
    return <AddProductComponent 
        validateProduct={validateProduct}
        handleCreatePromise={addProductPromise}
    />
}

export default AddProductContainer