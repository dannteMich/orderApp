import React from 'react';
import {storiesOf} from '@storybook/react';
import {object} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions';

import OrderBuilder from './OrderBuilderComponent';
import ProductSelect from './ProductSelect';
import SingleSellerOrderTable from './SingleSellerOrderTable';
import {getAllProductsFromSellers} from './logic';

import {seller1, seller2} from '../../TestingUtils/mockData';
import { OrderItem } from '../../defs';

storiesOf('Orders', module)
    .add('Product Selector', () => {
        const products = getAllProductsFromSellers([seller1, seller2]);
        return <ProductSelect 
            products={object('products', products)}
            onSelect={action('product selected')}
        />
    })

    .add('Single Seller Order Table', () => {
        const items: OrderItem[] = [{
            sellerId: seller1.id,
            productId: seller1.products[0].id,
            amount: 1
        },
        {
            sellerId: seller1.id,
            productId: seller1.products[1].id,
            amount: 1
        }]
        return <SingleSellerOrderTable 
            items={items} 
            seller={seller1} 
            removeProduct={action('remove product')}
            updateProductAmount={action('update amount')}
        />
    })
    
    .add('Base', () => <OrderBuilder sellers={object('sellers', [seller1, seller2])}/>);
    