import React from 'react';

import {Container} from '@material-ui/core'

import {Account} from '../../defs';
import SellersGrid from '../SellerGrid/SellersGrid';
import AddSellerButton from '../AddSellerButton/AddSellerButtonContainer';
import AccountBasicData from './AccountBasicData';


const AccountView: React.FC<Account> = ({sellers, id, ...accountData}) => {
    

    const sellersComponent = sellers.length !== 0 ? 
        <SellersGrid sellers={sellers} /> :
        <NoSellersMessage />

    return <Container>
        <AccountBasicData {...accountData} />
        <AddSellerButton accountId={id}/>
        {sellersComponent}
    </Container>
}

const NoSellersMessage: React.FC = () => {
    return (<div>no sellers in this account1</div>)
}



export default AccountView;