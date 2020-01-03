import React, {useState} from 'react';
import _ from 'lodash';
import {  makeStyles } from '@material-ui/core';


import { Seller} from '../../defs';
import ProductSelect from './ProductSelect';
import { ProductWithSellerData, getAllProductsFromSellers} from './logic';

const useStyle = makeStyles({
    root: {}
})



interface Props {
    sellers: Seller[];
}

const OrderBuilder: React.FC<Props> = ({sellers}) => {
    const [productsInOrder, setProductsInOrder] = useState(new Set<string>());
    

    const addProductToOrder = (product: ProductWithSellerData) => setProductsInOrder(productsInOrder.add(product.id));
    const removeProductFromOrder = (product: ProductWithSellerData) => {
        if (!productsInOrder.delete(product.id)) {
            throw Error(`could not remove product ${product.name} from order`);
        }
        setProductsInOrder(productsInOrder);
    }


    return <ProductSelect 
        products={getAllProductsFromSellers(sellers)} 
        onSelect={addProductToOrder}
    />
}



export default OrderBuilder;