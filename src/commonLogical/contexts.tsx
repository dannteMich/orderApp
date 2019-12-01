import React, {useState} from 'react';
import { mockUser } from '../mockData';
import firebase from './firebase';

type operatorType = '==' | 'array-contains';

const db = firebase.firestore();
const getAccountsIdByQuery = (field: string, operator: operatorType, value: any) => {
    return db.collection('accounts').where(field, operator, value)
        .get().then(querySnapshot => querySnapshot.docs.map(doc => doc.id));
}

export const currentAccountIdContext = React.createContext({
    currentAccountId: "",
    setCurrentAccountId: (s: string) => {}
});

export const userContext = React.createContext({
    userId: "",
    setUserId: (s: string) => {},
});

export const accountsContext = React.createContext({
    accountIds: [] as string[],
    setAccountIds: (a: string[]) => {},
})


const AppContextProvider: React.FC = ({children}) => {
    const [userId, setUserId] = useState(mockUser.email); // TODO: replace with empty string
    const [accountIds, setAccountIds] = useState([] as string[]);
    const [currentAccountId, setCurrentAccountId] = useState();
    
    if (userId && userId !== "" && !currentAccountId) {
        Promise.all([
            getAccountsIdByQuery('owner', '==', userId),
            getAccountsIdByQuery('managers', 'array-contains', userId),
            getAccountsIdByQuery('members', 'array-contains', userId),
        ]).then(results => {
            const [ownersAccounts, managersAccounts, membersAccount] = results;
            const allAccountIds = ownersAccounts.concat(managersAccounts).concat(membersAccount);

            if (allAccountIds.length === 0) {
                throw Error("no corresponding accounts")
            }

            setAccountIds(allAccountIds);
            setCurrentAccountId(allAccountIds[0])
        })
    }

    return <userContext.Provider value={{userId, setUserId}}>
        <accountsContext.Provider value={{accountIds, setAccountIds}}>
            <currentAccountIdContext.Provider value={{currentAccountId, setCurrentAccountId}}>
                {children}
            </currentAccountIdContext.Provider>
        </accountsContext.Provider>
    </userContext.Provider>
}

export default AppContextProvider;