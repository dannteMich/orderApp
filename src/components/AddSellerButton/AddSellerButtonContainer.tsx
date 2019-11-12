import React from 'react';

import firebase from '../../db_interface/firebase';
import SellerButtonComponent from './AddSellerButtonComponent';
import {SellerAdditionPromise, SellerValidationMethod} from './NewSellerDialogComponent';

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