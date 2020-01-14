import React from 'react';
import {storiesOf} from '@storybook/react';
import {object} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions';

import OrderBuilder from './OrderBuilderComponent';
import ProductSelect from './ProductSelect';
import SingleSellerOrderTable from './SingleSellerOrderTable';
import {getAllProductsFromSellers} from './logic';

import {seller1, seller2, mockProducts} from '../../TestingUtils/mockData';
import { SingleSellerOrder } from '../../defs';

storiesOf('Orders', module)
    .add('Product Selector', () => {
        const products = getAllProductsFromSellers([seller1, seller2]);
        return <ProductSelect 
            products={object('products', products)}
            onSelect={action('product selected')}
        />
    })

    .add('Single Seller Order Table', () => {
        const sellerOrder: SingleSellerOrder = {
            [mockProducts[0].id]: {
                ...mockProducts[0],
                sellerId: seller1.id,
                amount: 3
            },
            [mockProducts[1].id]: {
                ...mockProducts[1],
                sellerId: seller1.id,
                amount: 1,
            }

        }
        return <SingleSellerOrderTable 
            sellerOrder={sellerOrder} 
            seller={seller1} 
            removeProduct={action('remove product')}
            updateProductAmount={action('update amount')}
        />
    })
    
    .add('Base', () => {
        const sellersMap = {
            [seller1.id]: seller1,
            [seller2.id]: seller2,
        }
        return <OrderBuilder 
            sellersMap={object('sellers', sellersMap)}
        />
    });
    