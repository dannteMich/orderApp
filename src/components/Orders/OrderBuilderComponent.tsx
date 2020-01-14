import React, {useState} from 'react';
import _ from 'lodash';

import {Container} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

import { Seller, Order} from '../../defs';
import {
    getProductsSelection, //getOrdersBySellerId, // TODO: delete this
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
    sellersMap: {
        [sellerId: string]: Seller;
    };
}


const OrderBuilder: React.FC<Props> = ({ sellersMap}) => {
    const classes = useStyle();
    const [order, setOrder] = useState<Order>({});

    const addProductToOrder = (sellerId: string, productId: string) => {
        setOrder(addItemToOrder(order, sellerId, sellersMap[sellerId].products[productId], 1));
    };
    
    const removeProduct = (sellerId: string, productId: string) => {
        setOrder(removeItemFromOrder(order, sellerId, productId));
    };
    
    const updateItemAmount = (sellerId: string, productId: string, newAmount: number) => {
        setOrder(addItemToOrder(order, sellerId, sellersMap[sellerId].products[productId], newAmount));
    }
    
    const tables = _.map(order, (sellerOrder, sellerId) => <SingleSellerOrderTable 
        sellerOrder={sellerOrder}
        removeProduct={removeProduct}
        updateProductAmount={updateItemAmount}
        seller={sellersMap[sellerId]}
        key={sellerId}
    />)

    return <Container className={classes.root}>
        <ProductSelect
            products={getProductsSelection(_.values(sellersMap), order)}
            onSelect={addProductToOrder}
        />
        {_.isEmpty(order) ? <NoOrdersNotification /> : tables}
    </Container>
}


export default OrderBuilder;

