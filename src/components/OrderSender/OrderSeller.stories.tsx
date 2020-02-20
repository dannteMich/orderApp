import React from 'react';
import { storiesOf } from '@storybook/react';

import {seller1, singleSeller1Order} from '../../TestingUtils/mockData';

import SingleSellerSender from './SingleSellerSender';

const specialSeller = {...seller1};
specialSeller.whatsapp = "972523252312"

storiesOf('Orders/OrderSender', module)
    .add('SingleSellerSender', () => {
        return <SingleSellerSender seller={specialSeller} sellerOrder={singleSeller1Order}/>
    })