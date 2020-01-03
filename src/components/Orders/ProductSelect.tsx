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
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    
    const handleSelect = (_: any, value: ProductWithSellerData) => {
        if (value) {
            setSnackbarOpen(true);
            onSelect(value);
        }
        
    }
    
    //!visibleComboBox && setVisibleComboBox(true); // TODO: this trick is horrible. find another way to update the options
    
    return <div className={classes.root}>
        <Typography variant="h5" className={classes.label}>
            Select a product to add
        </Typography>
        <Autocomplete
            clearOnEscape
            disableClearable
            size="small"
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
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={snackbarOpen}
            autoHideDuration={1000}
            onClose={() => setSnackbarOpen(false)}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<Typography variant='body1'>Adding Product</Typography>}
        />
    </div>;
}

export default ProductSelect;