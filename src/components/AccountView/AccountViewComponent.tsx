import React from 'react';

import { Container, Box} from '@material-ui/core'

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
        <SellersGrid account={account} sellers={sellers}/> :
        <NoSellersMessage />

    return <Container>
        <AccountBasicData {...account} />
        <Box display="flex" margin="10px 0">
            <Box flexGrow="1"/>
            <AddSellerButton accountId={account.id} />
            <Box flexGrow="1" />
        </Box>
        
        {sellersComponent}
    </Container>
}

// TODO: make add seller button a floating button in the future

const NoSellersMessage: React.FC = () => {
    return <div>no sellers in this account</div> // TODO: make this a bit more UMF
}



export default AccountView;