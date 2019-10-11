import React from 'react';
import {TableRow, TableCell} from '@material-ui/core';
import {FormControl, Input} from '@material-ui/core';

import { Order } from '../../defs';

interface OrderRowProps {
    order: Order
}

// TODO: this is used for understanding
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
    return (
        <TableRow>
            <TableCell>
                <FormControl required>
                    <Input
                        onChange={handleChange}
                        placeholder="Product Name"
                        value={order.product.name}
                    />
                    
                </FormControl>
            </TableCell>
            <TableCell>
                <Input
                    placeholder="Amount"
                    onChange={handleChange}
                    value={order.amount}
                    inputProps={{
                        type: "number",
                        min: 0,
                        step: 1,
                    }}
                />
                
            </TableCell>
        </TableRow>
    )
}
export default OrderRow;