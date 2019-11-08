import React from 'react';
import { Container } from '@material-ui/core';
import ApplicationBar from '../components/ApplicationBar';
import Accountview from '../components/AccountView/AccountView';

import {DEV_ACCOUNT_NAME} from '../mockData';

const AccountRoute: React.FC = () => {

    return (
        <div>
            <ApplicationBar caption="Account Mamangment"/>

            <Container>
                <Accountview accountId={DEV_ACCOUNT_NAME}/>
            </Container>
        </div>
    );
}

export default AccountRoute;