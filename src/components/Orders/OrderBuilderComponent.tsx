import React, {useState} from 'react';
import _ from 'lodash';

import {Container} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

import { Seller, OrderItem} from '../../defs';
import {
    getProductsSelection, getOrdersBySellerId,
    addItemToOrder, removeItemFromOrder
} from './logic';
import ProductSelect from './ProductSelect';
import SingleSellerOrderTable from './SingleSellerOrderTable';
import NoOrdersNotification from './NoOrdersNotification';


const useStyle = makeStyles({
    root: {
        marginTop: 20,
    }
})

interface Props {
    sellers: Seller[];
}


const OrderBuilder: React.FC<Props> = ({sellers}) => {
    const classes = useStyle();
    const [order, setOrder] = useState<OrderItem[]>([]);

    const addProductToOrder = (sellerId: string, productId: string) => {
        setOrder(addItemToOrder(order, sellerId, productId, 1));
    };
    
    const removeProduct = (sellerId: string, productId: string) => {
        setOrder(removeItemFromOrder(order, sellerId, productId));
    };
    
    const updateItemAmount = (sellerId: string, productId: string, newAmount: number) => {
        setOrder(addItemToOrder(
            removeItemFromOrder(order, sellerId, productId),
            sellerId,
            productId, 
            newAmount
        ));
    }

    const ordersBySellerId = getOrdersBySellerId(order);
    
    const tables = _.map(ordersBySellerId, (orders, sellerId) => <SingleSellerOrderTable 
        items={orders}
        removeProduct={removeProduct}
        updateProductAmount={updateItemAmount}
        seller={sellers.find(seller => seller.id === sellerId) as Seller}
        key={sellerId}
    />)

    return <Container className={classes.root}>
        <ProductSelect
            products={getProductsSelection(sellers, order)}
            onSelect={addProductToOrder}
        />
        {order.length > 0 ? tables : <NoOrdersNotification />}
    </Container>
}


export default OrderBuilder;

