import React from 'react';
import { storiesOf } from '@storybook/react'

import SellerGrid from './SellersGrid';


const sellers = [
    {
        name: "A Seller",
        mobile: "0987654321",
        email: "mail@gmail.com",
        products: [],
    },
    {
        name: "A Seller",
        mobile: "0987654321",
        email: "mail@gmail.com",
        products: [],
    },
    {
        name: "A Seller",
        mobile: "0987654321",
        email: "mail@gmail.com",
        products: [],
    },
]

storiesOf('SellerGrid', module)
    .add('Grid', () => <SellerGrid sellers={sellers} />);