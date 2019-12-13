import React from 'react';
import {useHistory} from 'react-router-dom';
import {Seller, Account} from '../../defs';
import SellerCard from './SellerCard';
import {Grid} from '@material-ui/core'


interface Props {
    sellers: Seller[];
    account: Account;
}

const SellersGrid: React.FC<Props> = ({sellers, account}) => {
    const history = useHistory();
    const sellerCards = sellers.map((seller, i) => {
        return <Grid key={i} item>
                <SellerCard 
                    seller={seller}
                    onClick={() => history.push(`/accounts/${account.id}/sellers/${seller.id}`)}
                />
        </Grid>
    });
    return <Grid container spacing={3} justify="center">
            {sellerCards}
    </Grid>
}


export default SellersGrid