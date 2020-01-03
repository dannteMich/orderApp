import React, {useState} from 'react';
import { Typography, TextField, Snackbar, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import {ProductWithSellerData} from './logic';

const useStyle = makeStyles({
    root: {
        display: 'flex',
    },
    label: {
        flexGrow: 0,
        margin: "0 10px",
        paddingTop: 4,
    },
    comboBox: {
        flexGrow: 1,
    }
})

interface Props {
    products: ProductWithSellerData[];
    onSelect: (product: ProductWithSellerData) => void;
}

const ProductSelect: React.FC<Props> = ({products, onSelect}) => {
    const classes = useStyle();
    const [inputValue, setInputValue] = useState('');
    
    const handleSelect = (_: any, value: ProductWithSellerData) => {
        if (value) {
            setTimeout(() => setInputValue(''), 1); // why is this needed?!?
            onSelect(value);
        }
    }

    const onInputChange = (_: any, newValue: string) => setInputValue(newValue);
    
    return <div className={classes.root}>
        <Typography variant="h5" className={classes.label}>
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