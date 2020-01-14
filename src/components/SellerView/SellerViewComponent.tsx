import React from 'react';
import _ from 'lodash';

import {Container, Typography, List, ListItem, ListItemText} from '@material-ui/core'

import {Seller, NewProduct} from '../../defs';
import AddProductForm from './AddProductComponent';
import ProductTable from './ProductsTable';

interface Props {
    seller: Seller;
    validateProduct: (product: Partial<NewProduct>) => void;
    handleAddProduct: (product: NewProduct) => Promise<boolean>;
    handleDeleteSeller: (v: void) => Promise<void>;
    handleDeleteProduct: (productId: string) => Promise<void>;
}

const SellerView: React.FC<Props> = ({ seller, validateProduct, handleAddProduct, handleDeleteSeller, handleDeleteProduct}) => {
    const {email, whatsapp, name, products} = seller;
    const emailNode = email === "" ? null : 
        <ListItemContact name="Email" value={email || ""} />;
    
    const whatsappNode = whatsapp === "" ? null : 
        <ListItemContact name="Whatsapp Phone" value={whatsapp || ""} />;
 
    
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
        <AddProductForm validateProduct={validateProduct} handleCreatePromise={handleAddProduct}/>
        
        <ProductTable products={_.values(products)} handleDeleteClick={handleDeleteProduct}/>
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