import React from 'react';
import {action} from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import AddSellerButton from './AddSellerButtonComponent';

storiesOf('AddSellerButton', module)
    .add('AddSellerButton with success add mock function', () => <AddSellerButton 
        onCreate={(object) => {
            action('create new');
            return true;
        }}/>)
    .add('AddSellerButton with failed add mock function', () => <AddSellerButton
        onCreate={(object) => {
            action('create new');
            return false;
        }} />)

