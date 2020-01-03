import React from 'react';
import {storiesOf} from '@storybook/react';
import {object} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions';

import OrderBuilder from './OrderBuilderComponent';
import ProductSelect from './ProductSelect';
import {getAllProductsFromSellers} from './logic';

import {seller1, seller2} from '../../TestingUtils/mockData';

storiesOf('Orders', module)
    .add('Product Selector', () => {
        const products = getAllProductsFromSellers([seller1, seller2])
        return <ProductSelect 
            products={object('products', products)}
            onSelect={action('product selected')}
        />
    })
    .add('Base', () => <OrderBuilder sellers={object('sellers', [seller1, seller2])}/>);
    