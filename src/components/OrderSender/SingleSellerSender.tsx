import React, {useState} from 'react';
import { Button, TextField, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import copy from 'copy-to-clipboard';

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
    SendButton: {
        flex: "1 1",
        margin: "5px 0",
        textAlign: "center",
    },
    CopyToClipboardButton: {
        flex: "0 0",
        margin: "5px 0",
        textAlign: "center",
        fontSize: "x-small",
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
            {getSendButtons(seller, getMessageText())}
        </div>
    </div>
}

export default SingleSellerSender;

const getSendButtons = (seller: Seller, messageText: string) => {
    const messageUriEncoded = () => encodeURIComponent(messageText);
    const sendWithWhatsappHref = `https://wa.me/${seller.whatsapp}?text=${messageUriEncoded}`;
    const sendWithMailHref = `mailto:${seller.email}?subject=order`; // TODO: if this works then add body

    const buttons = [<CopyToClipboardButton textToCopy={messageText}/>]

    if (seller.whatsapp) {
        buttons.splice(-1, 0, <SendButton href={sendWithWhatsappHref}>
            Send by Whatsapp
        </SendButton>)
    }
    if (seller.email) { // TODO: not sure this button works on desktop. should check on mobile
        buttons.splice(-1, 0, <SendButton href={sendWithMailHref}>
            Send via Email
        </SendButton>)
    }

    return buttons;
}

interface SendButtonProps {
    href: string
}

const SendButton: React.FC<SendButtonProps> = ({href, children}) => {
    const classes = useStyle();
    return <Button href={href} variant="contained" color="primary" className={classes.SendButton} id="whatsapp" target="_blank">
        {children}
    </Button>
}

interface CopyToClipboardButtonProps {
    textToCopy: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({textToCopy}) => {
    const classes = useStyle();
    const handleCopyToClipboard = () => {
        copy(textToCopy);
        alert("message copied to clipboard")
    }

    return <Button color="secondary" variant="contained" id="copy" onClick={handleCopyToClipboard} className={classes.CopyToClipboardButton}>
        Copy to clipboard
    </Button>
}