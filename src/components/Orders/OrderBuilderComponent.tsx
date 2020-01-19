import React, {useState} from 'react';
import _ from 'lodash';

import {Container, Button} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

import { Order, sellersMapping} from '../../defs';
import {getProductsSelection, addItemToOrder, removeItemFromOrder} from './logic';
import ProductSelect from './ProductSelect';
import SingleSellerOrderTable from './SingleSellerOrderTable';
import NoOrdersNotification from './NoOrdersNotification';


const useStyle = makeStyles({
    root: {
        marginTop: 20,
    }
})

interface Props {
    sellersMap: sellersMapping;
    currentOrder?: Order;
    onSaveOrder: (order: Order) => Promise<void>;
}


const OrderBuilder: React.FC<Props> = ({ sellersMap, onSaveOrder, currentOrder={}}) => {
    const classes = useStyle();
    const [order, setOrder] = useState<Order>(currentOrder);
    const [showSaveOrderButton, setShowSaveOrderButton] = useState(false);

    const addProductToOrder = (sellerId: string, productId: string) => {
        setOrder(addItemToOrder(order, sellerId, sellersMap[sellerId].products[productId], 1));
        setShowSaveOrderButton(true);
    };
    
    const removeProduct = (sellerId: string, productId: string) => {
        setOrder(removeItemFromOrder(order, sellerId, productId));
        setShowSaveOrderButton(true);
    };
    
    const updateItemAmount = (sellerId: string, productId: string, newAmount: number) => {
        setOrder(addItemToOrder(order, sellerId, sellersMap[sellerId].products[productId], newAmount));
        setShowSaveOrderButton(true);
    }

    const handleClickSaveOrder = () => {
        onSaveOrder(order).then(() => setShowSaveOrderButton(false));
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
        {showSaveOrderButton && 
            <Button color="primary" variant="contained" onClick={handleClickSaveOrder}>
                Save Current Order
            </Button>
        }
        
    </Container>
}


export default OrderBuilder;

