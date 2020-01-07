import React from 'react';
import { storiesOf } from '@storybook/react';
import {select, text, boolean} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import InputWithValidation from './InputWithValidation';

storiesOf('Inputs/InputWithValidation', module)
    .add('Checks if natural number', () => {
        
        const isNaturalNumber = (n: string) => {
            const n1 = parseInt(n, 10);
            const n2 = Math.abs(n1);
            return !isNaN(n1) && n2 === n1 && n1.toString() === n; 
        }

        const getErrorMessage = () => "The amount should be a Natural number"

        return <InputWithValidation
            getErrorMessage={getErrorMessage}
            validateValue={isNaturalNumber}
            label={text('label', 'Amount')}
            size={select('size', ['medium', 'small'], 'small')}
            callOnBlur={boolean('callOnBlur', false)}
            callOnChange={boolean('callOnChange', false)}
            handleNewValidValue={action('new valid value')}
            startTextAdornment={text('start text adornment', '')}
            endTextAdornment={text('end text adornment', '')}
        />
    })