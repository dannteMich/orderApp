import React from 'react';
import { storiesOf } from '@storybook/react';

import {
    seller1, singleSeller1Order, fullOrder, sellerMapping
} from '../../TestingUtils/mockData';

import SingleSellerSender from './SingleSellerSender';
import OrderSender from './OrderSender';

const specialSeller = {...seller1};
specialSeller.whatsapp = "972523252312"
specialSeller.email = "somemail@gmail.com"

// const fullOrder = {
//     [seller1.id]: singleSeller1Order
// }

// const sellerMapping = {
//     [seller1.id]: seller1,
// }

storiesOf('Orders/OrderSender', module)
    .add('SingleSellerSender', () => {
        return <div style={{maxWidth: 400}}>
            <SingleSellerSender seller={specialSeller} sellerOrder={singleSeller1Order}/>
        </div>
    })
    .add('Full OrderSender', () => {
        return <OrderSender order={fullOrder} sellersMap={sellerMapping}/>
    })