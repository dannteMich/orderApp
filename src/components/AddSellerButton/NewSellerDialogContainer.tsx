import React, { useContext } from 'react';

import firebase from '../../commonLogical/firebase';
import {currentAccountIdContext} from '../../commonLogical/contexts';
import NewSellerDialogComponent from './NewSellerDialogComponent';
import {SellerAdditionPromise, SellerValidationMethod} from './NewSellerDialogComponent';

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
    isOpen: boolean;
    close: () => void;
}

const NewSellerDialogContainer: React.FC<Props> = ({isOpen, close}) => {
    const {currentAccountId} = useContext(currentAccountIdContext);
    
    const createSellerPromise: SellerAdditionPromise = seller => {
        return firebase.firestore().collection('accounts').doc(currentAccountId)
            .collection('sellers').add(seller)
            .then(newSellerDoc => newSellerDoc.id ? true : false);
    }
    
    return <NewSellerDialogComponent 
        isOpen={isOpen}
        close={close}
        validateSeller={validateLegalInputForSeller}
        handleCreatePromise={createSellerPromise}
    />
}

export default NewSellerDialogContainer;