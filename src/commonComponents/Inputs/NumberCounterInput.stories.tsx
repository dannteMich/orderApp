import React from 'react';
import { storiesOf } from '@storybook/react';
import {number} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions';
import NumberCounter from './NumberCounterInput';

storiesOf('Inputs', module)
    .add('Number Counter', () => {
        return <NumberCounter 
            value={number('value', 0)}
            handleNewValue={action('got new value')}
        />
    })