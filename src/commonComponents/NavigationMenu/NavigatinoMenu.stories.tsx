import React from 'react';
import { storiesOf,} from '@storybook/react';
import {object} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';

import NavigationMenu from './NavigationMenu';
import SingleAccountNavigation from './SingleAccountNavigation';
import ContextAndBrowserWrapper from '../../TestingUtils/ContextAndBrowserWrapper'

import {account1} from '../../TestingUtils/mockData';

storiesOf('NavigationMenu', module)
    .add('Single account menu', () => <ContextAndBrowserWrapper>
        <SingleAccountNavigation
            account={object('Account', account1)}
            afterClick={action('after click')}
        />    
    </ContextAndBrowserWrapper>)
    .add('full', () => <ContextAndBrowserWrapper>
        <NavigationMenu />
    </ContextAndBrowserWrapper>)


    
    
