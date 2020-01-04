import React, {useState} from 'react';
import {createSelector, } from 'reselect';
import _ from 'lodash';

import {Container, Typography, Box} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

import { Seller, OrderItem} from '../../defs';
import { ProductWithSellerData, getAllProductsFromSellers} from './logic';
import ProductSelect from './ProductSelect';
import SigleSellerOrderTable from './SingleSellerOrderTable';

const productsToShow = createSelector( // takes sellers and orders
    (sellers: Seller[], orders: OrderItem[]) => getAllProductsFromSellers(sellers),
    (sellers: Seller[], orders: OrderItem[]) => new Set(orders.map(order => order.productId)),
    
    (productsAvailable: ProductWithSellerData[], productsInOrder: Set<string>) => {
        return productsAvailable.filter(product => !productsInOrder.has(product.id))
    }
)

const getOrdersBySellerId = createSelector(
    (orders: OrderItem[]) => orders,
    (orders: OrderItem[]) => _.groupBy(orders, order => order.sellerId),
)

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
    const [orders, setOrders] = useState<OrderItem[]>([]);

    const addProductToOrder = (product: ProductWithSellerData) => {
        const newOrders = orders.concat([{
            productId: product.id,
            sellerId: product.sellerId,
            amount: 1,
        }]);
        setOrders(newOrders);
    };
    
    const removeProduct = (sellerId: string, productId: string) => {
        const newOrders = orders
            .filter(item => item.sellerId !== sellerId || item.productId !== productId);
        setOrders(newOrders);
    };

    const ordersBySellerId = getOrdersBySellerId(orders);
    
    const tables = _.map(ordersBySellerId, (orders, sellerId) => <SigleSellerOrderTable 
        items={orders}
        removeProduct={removeProduct}
        seller={sellers.find(seller => seller.id === sellerId) as Seller}
        key={sellerId}
    />)

    return <Container className={classes.root}>
        <ProductSelect
            products={productsToShow(sellers, orders)}
            onSelect={addProductToOrder}
        />
        {orders.length > 0 ? tables : <NoOrdersNotification />}
    </Container>
}


export default OrderBuilder;

const NoOrdersNotification: React.FC = () => {
    return <Box display="flex" margin="40px">
        <Box flexGrow="1"/>
        <Box>
            <Typography>
                There are no items in this Order.
            </Typography>
            <Typography>
                Please add products from the select menu.
            </Typography>
        </Box>
        <Box flexGrow="1" />
    </Box>    
}