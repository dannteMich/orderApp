import React from 'react';
import { storiesOf } from '@storybook/react';

import {seller1, singleSeller1Order} from '../../TestingUtils/mockData';

import SingleSellerSender from './SingleSellerSender';

storiesOf('Orders/OrderSender', module)
    .add('SingleSellerSender', () => {
        return <SingleSellerSender seller={seller1} sellerOrder={singleSeller1Order}/>
    })