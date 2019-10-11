import React from 'react';
import {Table, TableBody} from '@material-ui/core';

import {Order} from '../../defs';
import OrderRow from './OrderRow';


interface OrderListProps {
    orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({orders}) => {
    const ordersElements = orders.map((order, i) => <OrderRow order={order} key={i}/>)
    return (
        <Table>
            <TableBody>

                {ordersElements}
            </TableBody>
        </Table>
    )
}

export default OrderList
