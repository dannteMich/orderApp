import React from 'react';
import {Table, TableBody, TableHead, TableRow, TableCell} from '@material-ui/core';
import {Fab} from '@material-ui/core';
import {Add as AddIcon} from '@material-ui/icons';
import {createSelector} from 'reselect';

import {EditableOrder} from '../../defs';
import OrderRow from './OrderRow';
import {mockProducts} from '../../mockData' // TODO: later this should be fetched
import {AvailableProductsContext} from '../../context';

const testEmptyOrderExists = createSelector(
    (orders: EditableOrder[])  => orders,
    orders => orders.some(order => !order.product)
)

const OrderList: React.FC = () => {
    const [orders, setOrders] = React.useState([{}] as EditableOrder[])

    const updateOrderAtIndex = (order: EditableOrder, index: number) => {
        const newOrders = orders.slice(0)
        newOrders[index] = order;
        setOrders(newOrders);
    }

    const addOrder = () => {
        const newOrders = orders.slice(0);
        newOrders.push({} as EditableOrder);
        setOrders(newOrders);
    }

    const deleteOrderAtIndex = (index: number) => {
        const newOrders = orders.slice(0);
        newOrders.splice(index, 1);
        setOrders(newOrders)
    }

    const ordersElements = orders.map(
        (order, i) => (
            <OrderRow order={order}  key={i} 
                onOrderChange={(order: EditableOrder) => updateOrderAtIndex(order, i)}
                onOrderDelete={() => deleteOrderAtIndex(i)}
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
                            <TableCell>
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ordersElements}
                    </TableBody>
                </Table>
                <Fab 
                    color="primary" 
                    onClick={addOrder}
                    disabled={testEmptyOrderExists(orders)}
                >
                    <AddIcon />
                </Fab>
        </AvailableProductsContext.Provider>
    )
}

export default OrderList
