import React from 'react';
import _ from 'lodash';
import {createSelector} from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableHead, TableCell, TableBody, TableRow, Tooltip, Typography }
    from '@material-ui/core';
import { HighlightOffOutlined } from '@material-ui/icons'

import {OrderItem, Seller, Product} from '../../defs';
import CounterInput from '../../commonComponents/Inputs/NumberCounterInput';

const getProductsByIds = createSelector(
    (seller: Seller) => seller.products,
    (products: Product[]) => _.chain(products)
        .groupBy(product => product.id).mapValues(val => val[0]).value()
);

const useStyles = makeStyles({
    root: {
        margin: '30px 0'
    },
    tableHead: {
        fontWeight: "bold",
    }
})

interface Props {
    items: OrderItem[];
    seller: Seller,
    removeProduct: (sellerId: string, productId: string) => void;
    updateProductAmount: (sellerId: string, productId: string, newAmount: number) => void;
}

const OrderTable: React.FC<Props> = ({ items, seller, removeProduct, updateProductAmount}) => {
    const classes = useStyles();
    const productsById = getProductsByIds(seller);
    
    const rows = items.map((item, i) => <OrderItemRow 
        item={item} 
        productName={productsById[item.productId].name}
        removeProduct={() => removeProduct(item.sellerId, item.productId)} 
        updateProductAmount={newAmount => updateProductAmount(item.sellerId, item.productId, newAmount)}
        key={i}
    />)

    return <div className={classes.root}>
        <Typography variant="h6" gutterBottom>
            Order from {seller.name}
        </Typography>
        <Table size="small">
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
    productName: string;
    removeProduct: () => void;
    updateProductAmount: (newAmount: number) => void;
}

export const OrderItemRow: React.FC<OrderItemProps> = ({ item, productName, removeProduct, updateProductAmount}) => {
    return <TableRow>
        <TableCell>{productName}</TableCell>
        <TableCell>
            <CounterInput value={item.amount} minimum={0} handleNewValue={updateProductAmount}/>
        </TableCell>
        <TableCell>
            <Tooltip title="remove item from order">
                <Button onClick={removeProduct} >
                    <HighlightOffOutlined />
                </Button>
            </Tooltip>
        </TableCell>
    </TableRow>
}
