import React from 'react';
import {Seller} from '../../defs';
import SellerCard from './SellerCard';
import {Grid} from '@material-ui/core'


interface Props {
    sellers: Seller[];
}

const SellersList: React.FC<Props> = ({sellers}) => {
    const sellerCards = sellers.map((seller, i) => {
        return <Grid key={i} item>
            <SellerCard {...seller}/>
        </Grid>
    });
    return <Grid container spacing={3} justify="center">
            {sellerCards}
    </Grid>
}


export default SellersList