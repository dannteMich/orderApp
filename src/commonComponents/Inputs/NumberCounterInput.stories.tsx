import React, {useState} from 'react';
import { storiesOf } from '@storybook/react';
import {number, text} from '@storybook/addon-knobs'
import NumberCounter from './NumberCounterInput';

interface WrapperProps {
    value?: number;
    minimum?: number;
    maximum?: number;
    interval?: number;
    units?: string;
}

const CounterWrapper: React.FC<WrapperProps> = (props) => {
    const {value, ...restOfProps} = props;
    const [counter, setCounter] = useState(value || 0);
    return <NumberCounter 
        value={counter}
        handleNewValue={setCounter}
        {...restOfProps}
    />;
}

storiesOf('Inputs', module)
    .add('Number Counter', () => {
        return <CounterWrapper 
            value={number('value', 0)}
        />
    })
    .add('Number Counter With Knobs', () => {
        return <CounterWrapper
            value={number('value', 5)}
            minimum={number('minimum', 0)}
            maximum={number('maximum', 11)}
            interval={number('interval', 2)}
            units={text('units', 'Packs')}
        />
    })