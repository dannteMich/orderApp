import React from 'react';
import _ from 'lodash';
import { sellersMapping, Order } from '../../defs';
import SingleSellerSender from './SingleSellerSender';

interface Props {
    sellersMap: sellersMapping;
    order: Order
}

const OrderSender: React.FC<Props> = ({sellersMap, order}) => {
    const orderSenders = _.map(order, (singleSellerOrder, sellerId) => <SingleSellerSender 
        seller={sellersMap[sellerId]} 
        sellerOrder={singleSellerOrder}
        key={sellerId}
    />)
    
    return <div>
        Order Sender
        {orderSenders}
    </div>
}

export default OrderSender