import React, {useState, useContext} from 'react';

import {AccountWithoutSellers, Seller, Product} from '../../defs';
import firebase from '../../commonLogical/firebase';
import {AccountIdContext} from '../../commonLogical/contexts';
import AccountViewComponent from './AccountViewComponent';
import Loading from '../../commonComponents/LoadingBlob';

const db = firebase.firestore();

const AccountViewContainer: React.FC = () => {
    const accountId = useContext(AccountIdContext);
    const [accountData, setAccountData] = useState<AccountWithoutSellers>();
    const [sellers, setSellers] = useState<Array<Seller>>();

    // TODO: move the fetching to functions in this component
    if (!accountData) {
        db.collection('accounts').doc(accountId).onSnapshot(doc => {
            const newAccountData =  {
                ...doc.data(),
                id: doc.id,
            } as AccountWithoutSellers;
            setAccountData(newAccountData);
        }, /* TODO: handle error?*/);
        return  <Loading />
    
    } else if (!sellers) {
        db.collection('accounts').doc(accountId).collection('sellers').onSnapshot(collection => {
            const newSellers = [] as Seller[];
            collection.forEach(doc => {
                newSellers.push({
                    ...doc.data(),
                    id: doc.id,
                    products: [] as Product[],
                } as Seller);
            })
            setSellers(newSellers)
        }, /* TODO: handle error? */);
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