import React, {useState} from 'react';

import {Button} from '@material-ui/core'

import NewSellerDialogComponent, 
    {SellerAdditionPromise, SellerValidationMethod} from './NewSellerDialogComponent';


interface Props {
    validateSeller: SellerValidationMethod,
    handleCreatePromise: SellerAdditionPromise,
}

const AddSellerButton:React.FC<Props> = ({validateSeller, handleCreatePromise}) => {    
    const [open, setOpen] = useState(false);

    return <div>
        <Button variant="contained" color="primary"
            onClick={() => setOpen(true)}>
                Add Seller
        </Button>
        
        <NewSellerDialogComponent 
            isOpen={open}
            close={() => setOpen(false)}
            validateSeller={validateSeller}
            handleCreatePromise={handleCreatePromise}
        />

    </div>
}


export default AddSellerButton