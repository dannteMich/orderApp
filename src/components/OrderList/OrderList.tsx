import React from 'react';
import {Table, TableBody, TableHead, TableRow, TableCell} from '@material-ui/core';
import {EditableOrder} from '../../defs';
import OrderRow from './OrderRow';
import {mockProducts} from '../../mockData' // TODO: later this should be fetched
import {AvailableProductsContext} from '../../context';

const OrderList: React.FC = () => {
    const [orders, setOrders] = React.useState([{}] as EditableOrder[])

    const updateOrderAtIndex = (order: EditableOrder, index: number) => {
        const newOrders = orders.slice(0)
        newOrders[index] = order;
        setOrders(newOrders);
    }

    const ordersElements = orders.map(
        (order, i) => (
            <OrderRow order={order}  key={i} 
                onOrderChange={(order: EditableOrder) => updateOrderAtIndex(order, i)}
            />
    ))
    return (
        <AvailableProductsContext.Provider value={mockProducts}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Product
                        </TableCell>
                        <TableCell>
                            Amount
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ordersElements}
                </TableBody>
            </Table>
        </AvailableProductsContext.Provider>
    )
}

export default OrderList
