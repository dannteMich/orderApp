import React from 'react';
import {storiesOf} from '@storybook/react';
import {boolean} from '@storybook/addon-knobs'
import {Product} from '../../defs';

import AddProductComponent from './AddProductComponent';

const handleCreatePromiseAlwaysTrue = (product: Product) => Promise.resolve(boolean('added successfully', true));
const validateProductAlwaysValid = (product: Partial<Product>) => {
    // do nothing
}
const validateProductNotValid = (product: Partial<Product>) => {
    throw Error("not valid")
};

storiesOf('AddProductComponent', module)
    .add('valid input', () => <AddProductComponent 
        validateProduct={validateProductAlwaysValid}
        handleCreatePromise={handleCreatePromiseAlwaysTrue}
    />)
    .add('not valid input', () => <AddProductComponent
        validateProduct={validateProductNotValid}
        handleCreatePromise={product => Promise.reject("should not get here")}
    />)

