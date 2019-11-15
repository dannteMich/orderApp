import React, { useState } from 'react';
import _ from 'lodash';

import {Product, Measurement} from '../../defs';
import { TextField, Box, MenuItem, Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


const useStyle = makeStyles({
    measurementField: {
        minWidth: 170,
    },
    addButton: {
        bottom: -4,
    }
})

interface Props {
    validateProduct: (product: Partial<Product>) => void;
    handleCreatePromise: (product: Product) => Promise<boolean>;
}

const AddProductComponent: React.FC<Props> = ({validateProduct, handleCreatePromise}) => {
    const classes = useStyle();
    const [name, setName] = useState<string>();
    const [measurement, setMeasurement] = useState<Measurement>();

    const clearFields = () => {setName(""); setMeasurement(undefined)};

    const onCreateClick = () => {
        let newProduct = {name, measurement};
        try {
            validateProduct(newProduct);
        } catch (error) {
            alert(error);
            return;
        }
        handleCreatePromise(newProduct as Product).then(created => {
            if (created) {
                clearFields(); alert('created successfully');
            } else {
                alert('failed creating');
            }
        })
    }
    
    const measurementOptions = _.map(Measurement, (value, key) => {
        return <MenuItem key={key} value={key}>{value}</MenuItem>
    });
    return <Box display="flex" justifyContent="center">
        <Box p={1}>
            <TextField 
                required 
                label="Product Name" 
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </Box>
        <Box p={1}>
            <TextField 
                className={classes.measurementField}
                required 
                label="Measurement Unit" 
                value={measurement || ""}
                select
                onChange={e => setMeasurement(e.target.value as Measurement)}
            >
                {measurementOptions}
            </TextField>
        </Box>
        <Box p={2}>
            <Button 
                variant="contained" color="primary" 
                className={classes.addButton}
                onClick={onCreateClick}
            >
                Add
            </Button>
        </Box>
    </Box>
}

export default AddProductComponent;