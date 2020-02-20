import React, {useState} from 'react';
import { Button, TextField, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {singleSellerOrderToStringList, singleSellerOrderAsText} from './logic';
import { SingleSellerOrder, Seller } from '../../defs';

const useStyle = makeStyles({
    root: {
        display: "flex",
        flex: "0 0"
    },
    row: {
        display: "flex",
        flexDirection:"column",
        flex:"0 0",
    },
    firstRowCell: {
        flex: "0 0",
        minWidth: 200,
        margin: "4px 0",
    },
    orderCell: {
        padding: "0 14px",
    },
    Button: {
        flex: "1 1",
        margin: "5px 0",
    }
})

interface Props {
    seller: Seller;
    sellerOrder: SingleSellerOrder;
}



const SingleSellerSender: React.FC<Props> = ({seller, sellerOrder}) => {
    const classes = useStyle();
    
    const defaultGreeting = `Hi ${seller.name}. How are you?\nI'd like to order from you the following products:`
    const [prefix, setPrefix] = useState(defaultGreeting);
    const [postfix, setPostfix] = useState("Thanks.");

    const handleSendClick = () => {
        const messageText = prefix + '\n\n' + singleSellerOrderAsText(sellerOrder) + '\n\n' + postfix;
        window.open(`https://wa.me/${seller.whatsapp}?text=${encodeURIComponent(messageText)}`);
    }
    
    const orderItems = singleSellerOrderToStringList(sellerOrder).map((text, i) => <Typography key={i}>
        {text}
    </Typography>)
    
    return <div className={classes.root}>
        <div className={classes.row} >
            <div className={classes.firstRowCell}>
                <TextField multiline 
                    value={prefix}
                    variant="outlined"
                    onChange={e => setPrefix(e.target.value)}
                />
            </div>
            <div className={[classes.orderCell, classes.firstRowCell].join(' ')}>
                {orderItems}
            </div>
            <div className={classes.firstRowCell}>
                <TextField multiline
                    value={postfix}
                    variant="outlined"
                    onChange={e => setPostfix(e.target.value)}
                />
            </div>
        </div>
        <div className={classes.row}>
            <Button onClick={handleSendClick} variant="contained" color="primary" className={classes.Button}>
                Send by Whatsapp
            </Button>
        </div>
    </div>
}

export default SingleSellerSender;