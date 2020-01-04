import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableHead, TableCell, TableBody, TableRow, Tooltip }
    from '@material-ui/core';
import { HighlightOffOutlined } from '@material-ui/icons'

import {OrderItem, Seller} from '../../defs';

const productsFromSeller = (seller: Seller) => seller.products;

const useStyles = makeStyles({
    tableHead: {
        fontWeight: "bold",
    }
})

interface Props {
    items: OrderItem[];
    seller: Seller,
    removeProduct: (productId: string) => void;
}

const OrderTable: React.FC<Props> = ({ items, seller, removeProduct}) => {
    const classes = useStyles();

    const rows = items.map((item, i) => <OrderItemRow 
        item={item} 
        removeProduct={removeProduct} 
        key={i}
    />)

    return <div>
        <Table>
            <TableHead >
                <TableRow>
                    <TableCell className={classes.tableHead}>Product Name</TableCell>
                    <TableCell className={classes.tableHead}>Amount</TableCell>
                    <TableCell className={classes.tableHead}>Remove</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows}
            </TableBody>
        </Table>
    </div>
}

export default OrderTable;

interface OrderItemProps {
    item: OrderItem;
    removeProduct: (productId: string) => void;
}

export const OrderItemRow: React.FC<OrderItemProps> = ({item, removeProduct}) => {
    return <TableRow>
        <TableCell>{item.productId}</TableCell>
        <TableCell>{item.amount}</TableCell>
        <TableCell>
            <Tooltip title="remove item from order">
                <Button onClick={() => removeProduct(item.productId)} >
                    <HighlightOffOutlined />
                </Button>
            </Tooltip>
        </TableCell>
    </TableRow>
}
