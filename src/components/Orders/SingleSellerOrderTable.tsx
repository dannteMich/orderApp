import React from 'react';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableHead, TableCell, TableBody, TableRow, Tooltip, Typography }
    from '@material-ui/core';
import { HighlightOffOutlined } from '@material-ui/icons'

import { SingleSellerOrder, SingleProductOrder, Seller} from '../../defs';
import CounterInput from '../../commonComponents/Inputs/NumberCounterInput';


const useStyles = makeStyles({
    root: {
        margin: '30px 0'
    },
    tableHead: {
        fontWeight: "bold",
    }
})

interface Props {
    sellerOrder: SingleSellerOrder;
    seller: Seller;
    removeProduct: (sellerId: string, productId: string) => void;
    updateProductAmount: (sellerId: string, productId: string, newAmount: number) => void;
}

const OrderTable: React.FC<Props> = ({ sellerOrder, seller, removeProduct, updateProductAmount}) => {
    const classes = useStyles();
    
    const rows = _.map(sellerOrder, (productOrder, productId) => <OrderItemRow 
        {...productOrder}
        removeProduct={() => removeProduct(productOrder.sellerId, productId)} 
        updateProductAmount={newAmount => updateProductAmount(productOrder.sellerId, productId, newAmount)}
        key={productId}
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

interface OrderItemProps extends SingleProductOrder {
    removeProduct: () => void;
    updateProductAmount: (newAmount: number) => void;
}

export const OrderItemRow: React.FC<OrderItemProps> = ({ name, amount, removeProduct, updateProductAmount, measurement}) => {
    return <TableRow>
        <TableCell>{name}</TableCell>
        <TableCell>
            <CounterInput 
                value={amount} 
                minimum={0} 
                handleNewValue={updateProductAmount}
                units={measurement}
            />
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
