import React, {useState} from 'react';
import { Typography, TextField, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import {ProductWithSellerData} from './logic';

const useStyle = makeStyles({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    label: {
        flexGrow: 0,
        margin: "0 10px",
        paddingTop: 4,
    },
    comboBox: {
        flexGrow: 1,
        minWidth: 250,
    }
})

interface Props {
    products: ProductWithSellerData[];
    onSelect: (sellerId: string, productId: string) => void;
}

const ProductSelect: React.FC<Props> = ({products, onSelect}) => {
    const classes = useStyle();
    const [inputValue, setInputValue] = useState('');
    
    const handleSelect = (_: any, value: ProductWithSellerData) => {
        if (value) {
            setTimeout(() => setInputValue(''), 1); // why is this needed?!?
            onSelect(value.sellerId, value.id);
        }
    }

    const onInputChange = (_: any, newValue: string) => setInputValue(newValue);
    
    return <div className={classes.root}>
        <Typography variant="h6" className={classes.label}>
            Select a product to add
        </Typography>
        <Autocomplete
            clearOnEscape
            disableClearable
            size="small"
            inputValue={inputValue}
            onInputChange={onInputChange}
            className={classes.comboBox}
            options={products}
            onChange={handleSelect}
            getOptionLabel={(product: ProductWithSellerData) => product.name}
            groupBy={(product: ProductWithSellerData) => product.sellerName} // FIXME: bug with single comma?
            renderInput={params => (
                <TextField {...params}
                    placeholder="Product name" 
                    variant="outlined" 
                    fullWidth />
            )}
        />
    </div>;
}

export default ProductSelect;