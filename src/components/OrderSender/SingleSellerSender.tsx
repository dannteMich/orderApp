import React, {useState} from 'react';
import { Box, Button, TextField, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {singleSellerOrderToStringList, singleSellerOrderAsText} from './logic';
import { SingleSellerOrder, Seller } from '../../defs';

const useStyle = makeStyles({
    root: {
        marginTop: 20,
    },
    firstRowCell: {
        flex: "0 0",
        minWidth: 200,
        margin: 4,
    },
    orderCell: {
        padding: "0 14px",
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

    const alertWithText = () => alert([prefix, singleSellerOrderAsText(sellerOrder), postfix].join('\n'))
    
    const orderItems = singleSellerOrderToStringList(sellerOrder).map((text, i) => <Typography key={i}>
        {text}
    </Typography>)
    
    return <Box display="flex">
        <Box display="flex" flexDirection="column" flex="0 0">
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
        </Box>
        <Box flex="0 0">
            <Button onClick={alertWithText}>
                Send
            </Button>
        </Box>
    </Box>
}

export default SingleSellerSender;