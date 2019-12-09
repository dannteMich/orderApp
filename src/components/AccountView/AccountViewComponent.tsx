import React from 'react';

import {Container} from '@material-ui/core'

import {Account, Seller} from '../../defs';
import SellersGrid from '../SellerGrid/SellersGrid';
import AddSellerButton from '../AddSellerButton/AddSellerButtonComponent';
import AccountBasicData from './AccountBasicData';


interface Props {
    account: Account;
    sellers: Seller[],
}

const AccountView: React.FC<Props> = ({sellers, account}) => {
    

    const sellersComponent = sellers.length !== 0 ? 
        <SellersGrid sellers={sellers} /> :
        <NoSellersMessage />

    return <Container>
        <AccountBasicData {...account} />
        <AddSellerButton accountId={account.id}/>
        {sellersComponent}
    </Container>
}

const NoSellersMessage: React.FC = () => {
    return (<div>no sellers in this account1</div>)
}



export default AccountView;