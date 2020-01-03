import React, {useState, useContext} from 'react';

import {Seller, Product} from '../../defs';
import {accountsContext} from '../../commonLogical/contexts';
import firebase from '../../commonLogical/firebase';
import AccountViewComponent from './AccountViewComponent';
import LoadingBlob from '../../commonComponents/LoadingBlob';

const db = firebase.firestore();
const getAccountDoc = (accountId: string) => db.collection('accounts').doc(accountId);

interface Props {
    accountId: string;
}

const AccountViewContainer: React.FC<Props> = ({accountId}) => {
    const {accounts} = useContext(accountsContext);
    const [sellers, setSellers] = useState<Array<Seller>>();

    if (!accountId) {
        return <LoadingBlob />
    }
    
    const account = accounts.find(account => account.id === accountId);
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