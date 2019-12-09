import React, {useContext} from 'react';
import {accountsContext} from '../../commonLogical/contexts';
import { useHistory } from 'react-router';

const RootRoute: React.FC = () => {
    const history = useHistory();
    const {accounts} = useContext(accountsContext);

    if (accounts.length == 0) {
        alert("no accounts. something is wrong!!!")
    } else {
        history.replace(`/accounts/${accounts[0].id}`)
    }

    return null;
}

export default RootRoute;