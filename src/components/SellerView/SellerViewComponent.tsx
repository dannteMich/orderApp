import React from 'react';

import {Container, Typography, List, ListItem, ListItemText} from '@material-ui/core'
import {createStyles} from '@material-ui/styles'

import {Seller} from '../../defs';

type Props = Seller;

const SellerView: React.FC<Props> = ({id, name, email="", whatsapp="", products}) => {
    const emailNode = email === "" ? null : 
        <ListItemContact name="Email" value={email} />;
    
    const whatsappNode = whatsapp === "" ? null : 
        <ListItemContact name="Whtasapp Phone" value={whatsapp} />;
 
    
    return <Container>
        <Typography variant="h5" gutterBottom>
            {name}
        </Typography>
        <Typography>
            contact info
        </Typography>
        <List>
            {emailNode}
            {whatsappNode}
        </List>
    </Container>
}

interface ContactNodeProps {
    name: string;
    value: string;
}
const ListItemContact: React.FC<ContactNodeProps> = ({name, value}) => {
    return <ListItem>
        <ListItemText><b>{name}</b>: {value}</ListItemText>
    </ListItem>;
}

export default SellerView;