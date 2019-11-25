import React from 'react';

import {Container, Typography, List, ListItem, ListItemText} from '@material-ui/core'

import {Seller, Product} from '../../defs';
import AddProductForm from './AddProductContainer';
import ProductTable from './ProductsTable';

interface Props {
    seller: Seller;
    handleDeleteSeller: (v: void) => Promise<void>;
    handleDeleteProduct: (productId: string) => Promise<void>;
}

const SellerView: React.FC<Props> = ({ seller, handleDeleteSeller, handleDeleteProduct}) => {
    const {email, whatsapp, name, id, products} = seller;
    const emailNode = email === "" ? null : 
        <ListItemContact name="Email" value={email || ""} />;
    
    const whatsappNode = whatsapp === "" ? null : 
        <ListItemContact name="Whtasapp Phone" value={whatsapp || ""} />;
 
    
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
        <AddProductForm sellerId={id}/>
        
        <ProductTable products={products} handleDeleteClick={handleDeleteProduct}/>
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