import React, {useState} from 'react';

import {Seller, Product, Account} from '../../defs';
import firebase from '../../commonLogical/firebase';
import AccountViewComponent from './AccountViewComponent';
import LoadingBlob from '../../commonComponents/LoadingBlob';

const db = firebase.firestore();
const getAccountDoc = (accountId: string) => db.collection('accounts').doc(accountId);

interface Props {
    accountId: string;
}

const AccountViewContainer: React.FC<Props> = ({accountId}) => {
    const [account, setAccountData] = useState<Account>();
    const [sellers, setSellers] = useState<Array<Seller>>();

    if (!accountId) {
        return <LoadingBlob />
    }
    
    if (!account) { // TODO: I should get this from the context
        getAccountDoc(accountId).onSnapshot(doc => {
            const newAccountData =  {
                ...doc.data(),
                id: doc.id,
            } as Account;
            setAccountData(newAccountData);
        });    
    }
    
    if (!sellers) {
        getAccountDoc(accountId).collection('sellers').onSnapshot(collection => {
            const newSellers = [] as Seller[];
            collection.forEach(doc => {
                newSellers.push({
                    ...doc.data(),
                    id: doc.id,
                    products: [] as Product[],
                } as Seller);
            })
            setSellers(newSellers)
        });
    } 
    
    if (!account || !sellers) {
        return <LoadingBlob />
    } else {
        return <AccountViewComponent {...{account, sellers}} />
    }
    
}

export default AccountViewContainer