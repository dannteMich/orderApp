import React from 'react';
import { storiesOf,} from '@storybook/react';
import {text, object} from '@storybook/addon-knobs';
import {BrowserRouter} from 'react-router-dom';

import NavigationMenu from './NavigationMenu';
import SingleAccountNavigation from './SingleAccountNavigation';
import {userContext, accountsContext} from '../../commonLogical/contexts';
import {account1, account2} from '../../mockData';
import {Account} from '../../defs';

const ContextAndBrowserDecorator: React.FC = ({children}) => {
    const userContextValue = {
        userId: text('current user id', 'michael@someMail.com'),
        setUserId: (s: string) => { },
    }

    const accountsContextValue = {
        accounts: object('accounts', [account1, account2]),
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

storiesOf('NavigationMenu', module)
    .add('Single account menu', () => <ContextAndBrowserDecorator>
        <SingleAccountNavigation
            account={object('Account', account1)}
        />    
    </ContextAndBrowserDecorator>)
    .add('full', () => <ContextAndBrowserDecorator>
        <NavigationMenu />
    </ContextAndBrowserDecorator>)


    
    
