import React, {useState} from 'react';
import {Button, TextField, Container, useMediaQuery} from '@material-ui/core'
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    inputField: {
        marginTop: 2
    }
})

const AddSellerButton:React.FC = () => {
    const classes = useStyles();
    
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    return <div>
        <Button 
            onClick={() => setOpen(true)}>
                Add Seller
        </Button>
        <Dialog open={open} fullScreen={useMediaQuery('(max-width:600px)')}>
            <DialogTitle>Add Seller to Account</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill These fields to add a new seller to the account
                </DialogContentText>
                <Container>
                    <div className={classes.inputField}>
                        <TextField 
                            required
                            label="Seller name" 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className={classes.inputField}>
                        <TextField
                            label="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={classes.inputField}>
                        <TextField
                            label="Mobile Phone"
                            value={mobile}
                            onChange={e => setMobile(e.target.value)}
                        />
                    </div>
                </Container>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => alert("should create seller")}>Create</Button> 
                </DialogActions>

            </DialogContent>
        </Dialog>
    </div>
}

export default AddSellerButton