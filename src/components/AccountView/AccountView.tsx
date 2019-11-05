import React, {useState} from 'react';

import {CircularProgress, Typography, Button} from '@material-ui/core'

import {fetchAccount, addSellerToAccount} from '../../db_interface/requests';
import {Account} from '../../defs';
import { seller1 as mockSeller } from '../../mockData';

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
        <Button onClick={() => addSellerToAccount(accountId, mockSeller)}>add seller</Button>
    </div>
}

type AccountBasicDataProps = Pick<Account, 'name' | 'manager' | 'members'>;

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