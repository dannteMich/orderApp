import React from 'react';
import { storiesOf } from '@storybook/react';
import {number} from '@storybook/addon-knobs';

import {
    seller1, singleSeller1Order, fullOrder, sellerMapping
} from '../../TestingUtils/mockData';

import SingleSellerSender from './SingleSellerSender';
import OrderSender from './OrderSender';

const specialSeller = {...seller1};
specialSeller.whatsapp = "972523252312"
specialSeller.email = "somemail@gmail.com"



storiesOf('Orders/OrderSender', module)
    .add('SingleSellerSender', () => {
        const knobOptions = {
            range: true,
            min: 150,
            max: 1000,
            step: 1,
        }
        return <div style={{maxWidth: number('container width', 300, knobOptions)}}>
            <SingleSellerSender seller={specialSeller} sellerOrder={singleSeller1Order}/>
        </div>
    })
    .add('Full OrderSender', () => {
        return <OrderSender order={fullOrder} sellersMap={sellerMapping}/>
    })