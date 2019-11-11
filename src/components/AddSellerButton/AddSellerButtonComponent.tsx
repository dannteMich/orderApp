import React, {useState} from 'react';

import {Button, TextField, Container, useMediaQuery} from '@material-ui/core'
import { 
    Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';

import {SellerWithoutProducts} from '../../defs';


const useStyles = makeStyles({
    inputField: {
        marginTop: 2
    },
    cardTextContianer: {
        marginBottom: 15,
    }
})

interface Props {
    onCreate(seller: SellerWithoutProducts): boolean;
}

const AddSellerButton:React.FC<Props> = ({onCreate}) => {
    const classes = useStyles();
    
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    const onSuccess = () => {setOpen(false); setName(""); setEmail(""); setMobile("");};

    return <div>
        <Button variant="contained" color="primary"
            onClick={() => setOpen(true)}>
                Add Seller
        </Button>
        <Dialog open={open} fullScreen={useMediaQuery('(max-width:600px)')}>
            <DialogTitle>Add Seller to Account</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill These fields to add a new seller to the account
                </DialogContentText>
                <Container className={classes.cardTextContianer}>
                    <div className={classes.inputField}>
                        <TextField 
                            required
                            fullWidth
                            label="Seller name" 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className={classes.inputField}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={classes.inputField}>
                        <TextField
                            fullWidth
                            label="Mobile Phone"
                            value={mobile}
                            onChange={e => setMobile(e.target.value)}
                        />
                    </div>
                </Container>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => onCreate({name, email, mobile}) && onSuccess()} variant="outlined">
                        Create
                    </Button> 
                </DialogActions>

            </DialogContent>
        </Dialog>
    </div>
}

export default AddSellerButton