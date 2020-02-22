import React from 'react';
import { sellersMapping, Order } from '../../defs';

interface Props {
    sellersMap: sellersMapping;
    order: Order
}

const OrderSender: React.FC<Props> = ({sellersMap, order}) => {
    return <div>
        Order Sender
    </div>
}

export default OrderSender