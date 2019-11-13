import React, {useState} from 'react';

import {Button} from '@material-ui/core'

import NewSellerDialog from './NewSellerDialogContainer';

const AddSellerButton:React.FC = () => {    
    const [open, setOpen] = useState(false);

    return <div>
        <Button variant="contained" color="primary"
            onClick={() => setOpen(true)}>
                Add Seller
        </Button>
        
        <NewSellerDialog 
            isOpen={open}
            close={() => setOpen(false)}
        />

    </div>
}


export default AddSellerButton