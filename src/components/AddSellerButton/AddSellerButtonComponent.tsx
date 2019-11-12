import React, {useState} from 'react';
import _ from 'lodash';

import {makeStyles} from '@material-ui/core/styles';
import {Button, TextField, Container, useMediaQuery} from '@material-ui/core'
import {Dialog, DialogContent, 
    DialogContentText, DialogTitle, DialogActions} from '@material-ui/core'

import {Seller} from '../../defs';


const useStyles = makeStyles({
    inputField: {
        marginTop: 2
    },
    cardTextContainer: {
        marginBottom: 15,
    }
})

type SellerBaseData = Omit<Seller, "products" | "id">
export type SellerValidationMethod = (seller: SellerBaseData) => void;
export type SellerAdditionPromise = (seller: SellerBaseData) => Promise<boolean>;

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
        
        <NewSellerDialog 
            isOpen={open}
            close={() => setOpen(false)}
            validateSeller={validateSeller}
            handleCreatePromise={handleCreatePromise}
        />

    </div>
}

interface NewSellerDialogProps {
    isOpen: boolean;
    close: () => void;
    validateSeller: SellerValidationMethod,
    handleCreatePromise: SellerAdditionPromise,
}

const NewSellerDialog: React.FC<NewSellerDialogProps> = ({ isOpen, close, validateSeller, handleCreatePromise}) => {
    const classes = useStyles();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    const clearFields = () => { setName(""); setEmail(""); setWhatsapp("") };

    const onCreateClick = () => {
        let newSeller = { name, whatsapp, email }
        try {
            validateSeller(newSeller)
        } catch (error) {
            alert(error); // TODO: use sidebar
            return;
        };
        // TODO: clear empty-string values
        handleCreatePromise(newSeller).then(created => {
            if (created) {
                clearFields();close(); // TODO: goto page of new seller
                alert('created successfully'); // TODO: use sidebar
            } else {
                alert('failed creating'); // TODO: use sidebar
            }
        })
    }

    return (<Dialog open={isOpen} fullScreen={useMediaQuery('(max-width:600px)')}>
        <DialogTitle>Add Seller to Account</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please fill These fields to add a new seller to the account
                </DialogContentText>
            <Container className={classes.cardTextContainer}>
                <SellerTextField required label="Seller Name" value={name} setter={setName} />
                <SellerTextField label="Email" value={email} setter={setEmail} />
                <SellerTextField label="Whatsapp" value={whatsapp} setter={setWhatsapp} />
            </Container>
            <DialogActions>
                <Button onClick={close} variant="outlined" color="secondary">
                    Cancel
                    </Button>
                <Button onClick={onCreateClick} variant="outlined">
                    Create
                    </Button>
            </DialogActions>

        </DialogContent>
    </Dialog>)
}

interface SellerTextFieldProps {
    value: string;
    label: string;
    setter: (newValue: string) => void;
    required?: boolean;
}

const SellerTextField: React.FC<SellerTextFieldProps> = ({label, value, setter, required=false}) => {
    const classes = useStyles();

    return <div className={classes.inputField}>
        <TextField
            fullWidth
            required={required}
            label={label}
            value={value}
            onChange={e => setter(e.target.value)}
        />
    </div>
}

export default AddSellerButton