import React from 'react';
import _ from 'lodash';
import {Grid, Typography, Button, Box} from '@material-ui/core';
import { sellersMapping, Order } from '../../defs';
import SingleSellerSender from './SingleSellerSender';

interface Props {
    sellersMap: sellersMapping;
    order: Order
}

const OrderSender: React.FC<Props> = ({sellersMap, order}) => {
    const orderSenders = _.map(order, (singleSellerOrder, sellerId) => <Grid key={sellerId} item>
    
        <SingleSellerSender 
            seller={sellersMap[sellerId]} 
            sellerOrder={singleSellerOrder}
            key={sellerId}
        />
    </Grid>)
    
    return <div>
        <Typography variant="h5" align="center">
            Send orders to sellers
        </Typography>
        <Grid container spacing={3} justify="center">
            {orderSenders}
        </Grid>
        <Box display="flex" margin="20px 0">
            <Box flex="1 1" />
            <Button color="primary" style={{ marginLeft: "auto", marginRight: "auto" }} variant="contained">
                Mark as Sent
            </Button>
            <Box flex="1 1" />
        </Box>
        
    </div>
}

export default OrderSender