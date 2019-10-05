import React from 'react'
import {Table, TableBody, TableHead, TableRow, TableCell} from '@material-ui/core';

import {Order} from '../defs'
export function OrderRow({amount, measurement, productName}: Order) {
    return <TableRow>
        <TableCell>{productName}</TableCell>
        <TableCell>{amount}</TableCell>
        <TableCell>{measurement}</TableCell>
    </TableRow>
}

interface Props {
    orders: Order[]
}

const defaultProps: Props = {
    orders: []
}

export default function OrderList({orders}: Props) {
    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Measurement</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <OrderRow amount={3} measurement="units" productName="Milk Cartons"/>
        </TableBody>
    </Table>
}
OrderList.defaultProps = defaultProps;