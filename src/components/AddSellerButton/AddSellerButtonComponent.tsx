import React, {useState} from 'react';

import {Button} from '@material-ui/core'

import NewSellerDialog from './NewSellerDialogContainer';

interface Props {
    accountId: string;
}

const AddSellerButton:React.FC<Props> = ({accountId}) => {    
    const [open, setOpen] = useState(false);

    return <div>
        <Button variant="contained" color="primary"
            onClick={() => setOpen(true)}>
                Add Seller
        </Button>
        
        <NewSellerDialog
            accountId={accountId}
            isOpen={open}
            close={() => setOpen(false)}
        />

    </div>
}


export default AddSellerButton