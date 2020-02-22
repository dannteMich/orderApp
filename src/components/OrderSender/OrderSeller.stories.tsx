import React from 'react';
import { storiesOf } from '@storybook/react';

import {seller1, singleSeller1Order} from '../../TestingUtils/mockData';

import SingleSellerSender from './SingleSellerSender';
import OrderSender from './OrderSender';

const specialSeller = {...seller1};
specialSeller.whatsapp = "972523252312"
specialSeller.email = "somemail@gmail.com"

storiesOf('Orders/OrderSender', module)
    .add('SingleSellerSender', () => {
        return <SingleSellerSender seller={specialSeller} sellerOrder={singleSeller1Order}/>
    })
    .add('Full OrderSender', () => {
        return <OrderSender />
    })