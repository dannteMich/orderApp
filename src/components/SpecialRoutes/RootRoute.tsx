import React, {useContext} from 'react';
import {accountsContext} from '../../commonLogical/contexts';
import { useHistory } from 'react-router';
import {getAccountPath} from '../../RoutePaths';

// TODO: delete this component and move logic to App.tsx?
const RootRoute: React.FC = () => {
    const history = useHistory();
    const {accounts} = useContext(accountsContext);
    
    if (accounts.length === 0) {
        alert("no accounts. something is wrong!!!")
        return null;
    } 
    
    history.replace(getAccountPath(accounts[0].id));

    return null;
}

export default RootRoute;