import React from 'react';
import {storiesOf} from '@storybook/react';
import { object, boolean, text } from '@storybook/addon-knobs'

import SellerViewComponent from './SellerViewComponent';
import ProductsTable from './ProductsTable';
import AddProductComponent from './AddProductComponent';

import { seller1, mockProducts } from '../../mockData';
import {NewProduct} from '../../defs';


storiesOf('SellerView', module)
    .add('product Table', () => <ProductsTable
        products={object('products', mockProducts)}
        handleDeleteClick={p => Promise.resolve()}
    />)
    .add('add product', () => {
        const isValid = boolean('Product is valid', true);
        const notValidReason = text("Not Valid Reason", "Some reason this is not valid")
        const createdSuccessfully = boolean('product created successfully', true);
        
        const validationFunc = (p: Partial<NewProduct>) => {
            if (!isValid) {
                throw Error(notValidReason); // TODO: make oneliner
            }
        }
        
        return <AddProductComponent
            validateProduct={validationFunc}
            handleCreatePromise={p => Promise.resolve(createdSuccessfully)}
        />
    })
    .add('everything', () => {
        const responseString = "test this functionality in the add product story"

        const validationFunc = (p: Partial<NewProduct>) => {throw(responseString)}
        return <SellerViewComponent
            seller={seller1}
            validateProduct={validationFunc}
            handleAddProduct={p => Promise.reject(responseString)}
            handleDeleteProduct={productId => Promise.resolve()}
            handleDeleteSeller={() => Promise.resolve()}
    />})
