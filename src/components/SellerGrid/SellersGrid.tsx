import React from 'react';
import {useHistory} from 'react-router-dom';
import {Seller} from '../../defs';
import SellerCard from './SellerCard';
import {Grid} from '@material-ui/core'


interface Props {
    sellers: Seller[];
}

const SellersGrid: React.FC<Props> = ({sellers}) => {
    const history = useHistory();
    const sellerCards = sellers.map((seller, i) => {
        return <Grid key={i} item>
                <SellerCard 
                    seller={seller}
                    onClick={() => history.push(`/sellers/${seller.id}`)}
                />
        </Grid>
    });
    return <Grid container spacing={3} justify="center">
            {sellerCards}
    </Grid>
}


export default SellersGrid