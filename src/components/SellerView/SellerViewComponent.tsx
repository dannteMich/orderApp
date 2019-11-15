import React from 'react';

import {Container, Typography, List, ListItem, ListItemText} from '@material-ui/core'

import {Seller, Product} from '../../defs';
import AddProductForm from './AddProductContainer';

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
        <AddProductForm sellerId={id}/>
        <div>
            <ProductTable products={products}/>
        </div>
    </Container>
}

interface ProductTableProps {
    products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({products}) => {
    const productItems = products.map((product, i) => <li key={i}>{product.name}</li>)
    return <ul>
        {productItems}
    </ul>
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