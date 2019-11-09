import React, {useState} from 'react';

import {CircularProgress, Typography, Button} from '@material-ui/core'

import {fetchAccount} from '../../db_interface/requests';
import {Account} from '../../defs';
import SellersList from './SellersList';
import AddSellerButton from './AddSellerButton';

interface Props {
    accountId: string;
}

const AccountView: React.FC<Props> = ({accountId}) => {
    const [account, setAccount] = useState<Account>();

    if (!account) {
        fetchAccount(accountId)
            .then(account => {
                console.log(account);
                setAccount(account);
            });
        return <div>
            <CircularProgress />
        </div>
    }

    return <div>
        <AccountBasicData {...account} />
        <AddSellerButton />
        <SellersList sellers={account.sellers}/>
    </div>
}

type AccountBasicDataProps = Omit<Account, 'sellers'>;

const AccountBasicData: React.FC<AccountBasicDataProps> = ({name, manager, members}) => {
    const members_string = members.join(', ') + '.'
    return <div>
        <Typography variant="h3" gutterBottom>
            Account Name: {name}
        </Typography>
        <Typography variant="h5">
            Account Manager: {manager}
        </Typography>
        <Typography variant="body1">
            Members: {members_string}
        </Typography>

    </div>
}

export default AccountView;