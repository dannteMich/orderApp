import React, {useState} from 'react';
import { Seller, Product, } from '../../defs';
import { Typography, TextField, makeStyles } from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import _ from 'lodash';

const useStyle = makeStyles({
    root: {
        display: 'flex',
    },
    label: {
        flexGrow: 0,
    },
    comboBox: {
        flexGrow: 1,
    }
})

interface ProductWithSellerData extends Product {
    sellerId: string;
    sellerName: string;
}

interface Props {
    sellers: Seller[];
}

const OrderBuilder: React.FC<Props> = ({sellers}) => {
    const classes = useStyle();
    const [productsInOrder, setProductsInOrder] = useState(new Set<string>());
    const [visibleComboBox, setVisibleComboBox] = useState(true);

    const getAllProductsFromSellers = () => { // TODO: should I memoize this?
        const res = [] as ProductWithSellerData[];
        sellers.forEach(seller => seller.products.forEach(product => {
            res.push({
                ...product,
                sellerId: seller.id,
                sellerName: seller.name,
            })
        }))
        return res;
    }

    const addProductToOrder = (product: ProductWithSellerData) => setProductsInOrder(productsInOrder.add(product.id));
    const removeProductFromOrder = (product: ProductWithSellerData) => {
        if (!productsInOrder.delete(product.id)) {
            throw Error(`could not remove product ${product.name} from order`);
        }
        setProductsInOrder(productsInOrder);
    }

    !visibleComboBox && setVisibleComboBox(true); // TODO: this trick is horrible. find another way to update the options

    return <div className={classes.root}>
        <Typography variant="h5" className={classes.label}>
            Select a product to add
        </Typography>
        {visibleComboBox && <Autocomplete
            className={classes.comboBox}
            options={getAllProductsFromSellers().filter(product => !productsInOrder.has(product.id))}
            onChange={(_, value: ProductWithSellerData) => { addProductToOrder(value); setVisibleComboBox(false) }}
            getOptionLabel={(product: ProductWithSellerData) => product.name}
            groupBy={(product: ProductWithSellerData) => product.sellerName} // FIXME: bug with single comma?
            renderInput={params => (
                <TextField {...params} placeholder="Product name" variant="outlined" fullWidth />
            )}
        />}
        
    </div>;
}



export default OrderBuilder;