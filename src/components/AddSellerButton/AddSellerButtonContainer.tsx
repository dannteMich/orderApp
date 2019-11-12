import React from 'react';

import firebase from '../../db_interface/firebase';
import SellerButtonComponent, 
    {SellerAdditionPromise, SellerValidationMethod} from './AddSellerButtonComponent';

const db = firebase.firestore();

// TODO: should check if Seller with the same name exists
const validateLegalInputForSeller: SellerValidationMethod = seller => {
    const {whatsapp, email, name} = seller;
    if (name === "") {
        throw Error("Name of Seller can't be empty");
    }
    if (whatsapp === "" && email === "") {
        throw Error("The Email and the Phone number can't both be empty");
    }
}

//export const addSellerToAccount = (accountId: string, seller: Seller) => {
//     //IMPR: check if a similar seller already exists or use the seller name as ID
//     const {products, ...seller_without_products} = seller;
//     return db.collection('accounts').doc(accountId)
//         .collection('sellers').add(seller_without_products)
//         .then(docRef => docRef.get())
//         .then(docSnapshot => docSnapshot.exists);
// }


interface Props {
    accountId: string;
}

const SellerButtonContainer: React.FC<Props> = ({accountId}) => {

    const createSellerPromise: SellerAdditionPromise = seller => {
        return db.collection('accounts').doc(accountId).collection('sellers')
            .add(seller).then(newSellerDoc => newSellerDoc.id ? true : false);
    }
    
    return <SellerButtonComponent 
        validateSeller={validateLegalInputForSeller}
        handleCreatePromise={createSellerPromise}
    />
}

export default SellerButtonContainer;