import React from 'react';
import {storiesOf} from '@storybook/react';
import { object, boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import SellerViewComponent from './SellerViewComponent';
import ProductsTable from './ProductsTable';
import AddProductComponent from './AddProductComponent';

import { seller1 } from '../../mockData';
import { mockProducts } from '../../mockData';


storiesOf('SellerView', module)
    .add('product Table', () => <ProductsTable
        products={object('products', mockProducts)}
        handleDeleteClick={action("clicked delete!")}
    />)
    .add('add product', () => {
        const isValid = boolean('Product is valid', true);
        const notValidReason = text("Not Valid Reason", "Some reason this is not valid")
        const createdSuccessfully = boolean('product created successfully', true);
        const validationFunc = p => {
            if (!isValid) {
                throw Error(notValidReason);
            }
        }
        return <AddProductComponent
            validateProduct={validationFunc}
            handleCreatePromise={p => Promise.resolve(createdSuccessfully)}
        />
    })
    .add('everything', () => <SellerViewComponent
        seller={seller1}
        handleDeleteProduct={productId => Promise.resolve()}
        handleDeleteSeller={() => Promise.resolve()}
    />)
