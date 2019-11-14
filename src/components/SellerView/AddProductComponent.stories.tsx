import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Product} from '../../defs';

import AddProductComponent from './AddProductComponent';

const validateProductAlwaysValid = (product: Partial<Product>) => {
    // do nothings
};

const handleCreatePromiseAlwaysTrue = (product: Product) => Promise.resolve(true);

storiesOf('AddProductComponent', module)
    .add('basic', () => <AddProductComponent 
        validateProduct={validateProductAlwaysValid}
        handleCreatePromise={handleCreatePromiseAlwaysTrue}
    />)