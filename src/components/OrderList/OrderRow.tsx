import React from 'react';
import _ from 'lodash';

import {TableRow, TableCell} from '@material-ui/core';
import { Input, Select, MenuItem, IconButton} from '@material-ui/core';
import {HighlightOff} from '@material-ui/icons';

import { AvailableProductsContext} from '../../context'
import { EditableOrder } from '../../defs';

interface OrderRowProps {
    order: EditableOrder;
    onOrderChange: (newOrder: EditableOrder) => void;
    onOrderDelete: () => void;
}

// TODO: the select should be autocomplete
const OrderRow: React.FC<OrderRowProps> = ({ order, onOrderChange, onOrderDelete }) => {
    const products = React.useContext(AvailableProductsContext);

    const handleProductNameChange = (newName: string) => {
        const newProduct = _.find(products, product => product.name === newName);
        onOrderChange({
            product: newProduct,
            amount: order.amount || 0,
        })
    }

    const handleProductAmountChange = (newAmount: number) => {
        onOrderChange({
            ...order,
            amount: newAmount,
        })
    }

    return (
        <TableRow>
            <TableCell>
                <Select 
                    placeholder="Product Name" 
                    value={order.product ? order.product.name : ""} 
                    onChange={e => handleProductNameChange(e.target.value as string)}
                >
                    {
                        products.map( // TODO: should optimize this
                            (product, i) => <MenuItem key={i} value={product.name}>
                                {product.name}
                            </MenuItem>)
                    }
                </Select>
            </TableCell>
            <TableCell>
                <Input
                    placeholder="Amount"
                    onChange={e => handleProductAmountChange(parseInt(e.target.value))}
                    value={order.amount}
                    endAdornment={order.product ? order.product.measurement : ""}
                    inputProps={{
                        type: "number",
                        min: 0,
                        step: 1,
                    }}
                />
                
            </TableCell>
            <TableCell>
                <IconButton onClick={onOrderDelete}>
                    <HighlightOff/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
export default OrderRow;