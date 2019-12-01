import React, {useState, useContext} from 'react';

import {Seller, Product, Account} from '../../defs';
import firebase from '../../commonLogical/firebase';
import {currentAccountIdContext} from '../../commonLogical/contexts';
import AccountViewComponent from './AccountViewComponent';
import Loading from '../../commonComponents/LoadingBlob';
import LoadingBlob from '../../commonComponents/LoadingBlob';

type AccountWithoutSellers = Omit<Account, 'sellers'>;

const db = firebase.firestore();
const getAccountDoc = (accountId: string) => db.collection('accounts').doc(accountId);

const AccountViewContainer: React.FC = () => {
    const {currentAccountId} = useContext(currentAccountIdContext);
    const [accountData, setAccountData] = useState<AccountWithoutSellers>();
    const [sellers, setSellers] = useState<Array<Seller>>();

    if (!currentAccountId) {
        return <LoadingBlob />
    }
    else if (!accountData) {
        getAccountDoc(currentAccountId).onSnapshot(doc => {
            const newAccountData =  {
                ...doc.data(),
                id: doc.id,
            } as AccountWithoutSellers;
            setAccountData(newAccountData);
        });
        return  <Loading />
    
    } else if (!sellers) {
        getAccountDoc(currentAccountId).collection('sellers').onSnapshot(collection => {
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
        return <Loading />

    } else {
        const newAccount = {
            ...accountData,
            sellers,
        }
        return <AccountViewComponent {...newAccount} />
    }
    
}

export default AccountViewContainer