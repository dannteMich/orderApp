import React from 'react';
import { storiesOf } from '@storybook/react'

import SellerList from './SellersList';


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

storiesOf('SellerList', module)
    .add('Grid', () => <SellerList sellers={sellers} />);