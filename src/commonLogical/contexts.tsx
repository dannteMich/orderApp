import React, {useState} from 'react';
import firebase, {getCurrentUserId} from './firebase';

import {Account} from '../defs';
import LoadingBlob from '../commonComponents/LoadingBlob';

type operatorType = '==' | 'array-contains';

const db = firebase.firestore();
const getAccountsByQuery = (field: string, operator: operatorType, value: any) => {
    return db.collection('accounts').where(field, operator, value)
        .get().then(querySnapshot => querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        } as Account)));
}

export const userContext = React.createContext('');

export const accountsContext = React.createContext({
    accounts: [] as Account[],
    setAccounts: (a: Account[]) => {},
})


const AppContextProvider: React.FC = ({children}) => {
    const [userId, setUserId] = useState('');
    const [accounts, setAccounts] = useState<Account[]>();

    firebase.auth().onAuthStateChanged(user => {
        if (user && user.email) {
            setUserId(user.email)
        } else {
            setUserId('')
        }
    })
    
    if (userId !== "" && !accounts) {
        Promise.all([
            getAccountsByQuery('owner', '==', userId),
            getAccountsByQuery('managers', 'array-contains', userId),
            getAccountsByQuery('members', 'array-contains', userId),
        ]).then(results => {
            const [ownersAccounts, managersAccounts, membersAccount] = results;
            const allAccountIds = ownersAccounts.concat(managersAccounts).concat(membersAccount);

            if (allAccountIds.length === 0) {
                throw Error("no corresponding accounts")
            }

            setAccounts(allAccountIds);
        })
        return <LoadingBlob topMessage="loading accounts data" />
    }

    

    return <userContext.Provider value={userId}>
        <accountsContext.Provider value={{accounts: accounts as Account[], setAccounts}}>
                {children}
        </accountsContext.Provider>
    </userContext.Provider>
}

export default AppContextProvider;