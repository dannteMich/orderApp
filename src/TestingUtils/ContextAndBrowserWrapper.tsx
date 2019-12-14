import React from 'react';
import {text, object} from '@storybook/addon-knobs';
import { BrowserRouter } from 'react-router-dom';

import { userContext, accountsContext } from '../commonLogical/contexts';
import { account1, account2 } from './mockData';
import { Account } from '../defs';

interface Props {
    accounts?: Account[];
    userId?: string;
}

const ContextAndBrowserWrapper: React.FC<Props> = ({ 
    children, 
    accounts = [account1, account2],
    userId = 'michael@someMail.com',
}) => {
    const userContextValue = {
        userId: text('current user id', userId),
        setUserId: (s: string) => { },
    }

    const accountsContextValue = {
        accounts: object('accounts', accounts),
        setAccounts: (a: Account[]) => { },
    }

    return <userContext.Provider value={userContextValue}>
        <accountsContext.Provider value={accountsContextValue}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </accountsContext.Provider>
    </userContext.Provider>
}

export default ContextAndBrowserWrapper