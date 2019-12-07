import React from 'react';
import {storiesOf} from '@storybook/react';
import {text, object} from '@storybook/addon-knobs';
import {BrowserRouter} from 'react-router-dom';

import NavigationMenu from './NavigationMenu';
import SingleAccountNavigation from './SingleAccountNavigation';
import {userContext} from '../../commonLogical/contexts';
import {account1, account2} from '../../mockData';

storiesOf('NavigationMenu', module)
    .add('Single account menu', () => {
        const contextValue = {
            userId: text('current user id', 'michael@someMail.com'),
            setUserId: (s: string) => { },
        }

        return <userContext.Provider value={contextValue}>
            <BrowserRouter>
                <SingleAccountNavigation
                    account={object('Account', account1)}
                />
            </BrowserRouter>
        </userContext.Provider>
    })    
    // .add('full', () => <NavigationMenu 
    //     accounts={[account1]}
    //     currentUserId="michael@someMail.com"
    // />)


    
    
