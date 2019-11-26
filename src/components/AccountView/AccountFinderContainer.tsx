import React, { useState } from 'react';
import firebase from '../../commonLogical/firebase'; 
import { mockUser } from '../../mockData';
import LoadingBlob from '../../commonComponents/LoadingBlob';
import { AccountIdContext } from '../../commonLogical/contexts';

type operatorType = '==' | 'array-contains';

const db = firebase.firestore();
const getAccountsIdByQuery = (field: string, operator: operatorType, value: any) => {
    return db.collection('accounts').where(field, operator, value)
        .get().then(querySnapshot => querySnapshot.docs.map(doc => doc.id));
}

// const user = firebase.auth().currentUser; // TODO: replace this
const user = mockUser;

const AccountFinder: React.FC = ({children}) => {
    const [accountId, setAccountId] = useState();

    Promise.all([
        getAccountsIdByQuery('owner', '==', user.email),
        getAccountsIdByQuery('managers', 'array-contains', user.email),
        getAccountsIdByQuery('members', 'array-contains', user.email),
    ]).then(results => {
        const [ownersAccounts, managersAccounts, membersAccount] = results;
        const allAccountIds = ownersAccounts.concat(managersAccounts).concat(membersAccount);
        if (allAccountIds.length == 1) {
            setAccountId(allAccountIds[0])
        } else {
            alert(`number of accounts is ${allAccountIds.length}`) // IMPR: handel this
        }
    })

    if (!accountId) {
        return <LoadingBlob />
    }

    return <AccountIdContext.Provider value={accountId}>
        {children}
    </AccountIdContext.Provider>
}

export default AccountFinder;