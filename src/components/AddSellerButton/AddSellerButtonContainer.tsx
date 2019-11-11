import React from 'react';
import {SellerWithoutProducts} from '../../defs'
import {addSellerToAccount} from '../../db_interface/requests';
import SellerButtonComponent from './AddSellerButtonComponent';


interface IsValidResult {
    valid: boolean;
    errorMessage: string;
}

// TODO: should check if Seller with the same name exists
const isValid = (seller: SellerWithoutProducts): IsValidResult => {
    const {name, mobile, email} = seller;
    if (name == "") {
        return {
            valid: false,
            errorMessage: "Name of Seller can't be empty",
        }
    } else if (mobile == "" && email == "") {
        return {
            valid: false,
            errorMessage: "The Email and the Phone number can't both be empty"
        }
    }
    return {
        valid: true,
        errorMessage: ""
    }
}


interface Props {
    accountId: string;
}

const SellerButtonContainer: React.FC<Props> = ({accountId}) => {
    const onCreate = (seller: SellerWithoutProducts) => {
        const {errorMessage, valid} = isValid(seller);
        if (!valid) {
            alert(errorMessage);
            return false;
        }
        addSellerToAccount(accountId, {...seller, products: []})
        return true;
    }
    return <SellerButtonComponent onCreate={onCreate} />
}

export default SellerButtonContainer;