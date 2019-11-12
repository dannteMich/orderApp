import React from 'react';
import {Account} from '../../defs';

import {Typography} from '@material-ui/core';

type Props = Omit<Account, 'sellers'>;

const AccountBasicData: React.FC<Props> = ({ name, manager, members }) => {
    const members_string = members.join(', ') + '.'
    return <div>
        <Typography variant="h3" gutterBottom>
            Account Name: {name}
        </Typography>
        <Typography variant="h5">
            Account Manager: {manager}
        </Typography>
        <Typography variant="body1" gutterBottom>
            Members: {members_string}
        </Typography>

    </div>
}

export default AccountBasicData;