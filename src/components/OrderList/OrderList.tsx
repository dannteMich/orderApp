import React from 'react';
import {Order} from '../../defs';
import {Table, TableBody, TableRow, TableCell} from '@material-ui/core';

interface OrderListProps {
    orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({orders}) => {
    const ordersElements = orders.map(order => <OrderRow order={order} />)
    return (
        <Table>
            <TableBody>

                {ordersElements}
            </TableBody>
        </Table>
    )
}

export default OrderList


interface OrderRowProps {
    order: Order
}

const OrderRow: React.FC<OrderRowProps> = ({order}) => {
    return (
        <TableRow>
            <TableCell>
                {order.product.name}
            </TableCell>
            <TableCell>
                {order.amount}
            </TableCell>
        </TableRow>
    )
}