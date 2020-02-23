import React, {useState} from 'react';
import { 
    Card, CardContent, CardActions, Divider, 
    Box, TextField, Typography, 
    IconButton, ButtonGroup, Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { WhatsApp, MailOutline, FileCopyOutlined} from '@material-ui/icons';
import copy from 'copy-to-clipboard';

import {singleSellerOrderToStringList, singleSellerOrderAsText} from './logic';
import { SingleSellerOrder, Seller } from '../../defs';

const useStyle = makeStyles({
    orderCell: {
        margin: "4px 0",
        padding: "4px 14px",
        background: "lightgrey",
        borderRadius: "5px",
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

    const getMessageText = () => prefix + '\n\n' + singleSellerOrderAsText(sellerOrder) + '\n\n' + postfix;    
    
    const orderItems = singleSellerOrderToStringList(sellerOrder).map((text, i) => <Typography key={i}>
        {text}
    </Typography>)

    
    return <Card>
        <CardContent>
            <Typography align="center" style={{fontWeight: "bold"}}>
                Send order to {seller.name}
            </Typography>
        </CardContent>
        <Divider />
        <CardContent>
            <TextField multiline
                value={prefix}
                variant="outlined"
                onChange={e => setPrefix(e.target.value)}
                fullWidth
            />
            <div className={classes.orderCell}>
                {orderItems}
            </div>
            <TextField multiline
                value={postfix}
                variant="outlined"
                onChange={e => setPostfix(e.target.value)}
                fullWidth
            />
        </CardContent>
        <CardActions>
            <ButtonGroup color="primary" variant="text" size="small">
                {getSendButtons(seller, getMessageText())}
            </ButtonGroup>
            <Box flex="1 1" />
            <CopyToClipboardButton textToCopy={getMessageText()} />       
        </CardActions>
    </Card>
}

export default SingleSellerSender;

const getSendButtons = (seller: Seller, messageText: string) => {
    const messageUriEncoded = encodeURIComponent(messageText);
    const sendWithWhatsappHref = `https://wa.me/${seller.whatsapp}?text=${messageUriEncoded}`;
    const sendWithMailHref = `mailto:${seller.email}?subject=order`; // TODO: if this works then add body

    const buttons = []
    if (seller.whatsapp) {
        buttons.push(<Tooltip title="send with whatsapp" key="whatsapp">
            <IconButton href={sendWithWhatsappHref}>
                <WhatsApp />
            </IconButton>
        </Tooltip>)
    }
    if (seller.email) { // TODO: not sure this button works on desktop. should check on mobile
        buttons.push(<Tooltip title="send with mail" key="email">
            <IconButton href={sendWithMailHref}>
                <MailOutline />
            </IconButton>
        </Tooltip>)
    }
    return buttons;
}

interface CopyToClipboardButtonProps {
    textToCopy: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({textToCopy}) => {
    const handleCopyToClipboard = () => {
        copy(textToCopy);
        alert("message copied to clipboard")
    }

    return <Tooltip title="Copy to clipboard">
        <IconButton onClick={handleCopyToClipboard} size="small">
            <FileCopyOutlined />
        </IconButton>
    </Tooltip>
}