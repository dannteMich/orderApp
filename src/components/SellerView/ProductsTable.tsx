import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Box, Button, Table, TableHead, TableCell, TableBody, TableRow} from '@material-ui/core';
import {HighlightOffOutlined} from '@material-ui/icons'

import {Product} from '../../defs';

const useStyles = makeStyles({
    tableHead: {
        fontWeight: "bold",
    }
})

interface Props {
    products: Product[];
    handleDeleteClick: (productId: string) => void;
}

const ProductsTable: React.FC<Props> = ({ products, handleDeleteClick}) => {
    const classes = useStyles();
    const rows = products
        .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        .map((product, i) => <ProductRow 
            key={i}
            product={product} 
            onClickDelete={() => handleDeleteClick(product.id)}
        />)

    return <Box>
        <Table>
            <TableHead >
                <TableRow>
                    <TableCell className={classes.tableHead}>Product Name</TableCell>
                    <TableCell className={classes.tableHead}>Measurement Unit</TableCell>
                    <TableCell className={classes.tableHead}>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows}        
            </TableBody>
        </Table>
    </Box>
}

interface ProductRowProps {
    product: Product,
    onClickDelete: () => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, onClickDelete}) => {
    return <TableRow>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.measurement}</TableCell>
        <TableCell>
            <Button onClick={onClickDelete}>
                <HighlightOffOutlined />
            </Button>
        </TableCell>
    </TableRow>
}

export default ProductsTable;