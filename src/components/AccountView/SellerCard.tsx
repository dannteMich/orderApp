import React from 'react';

import {Seller} from '../../defs';

type Props = Omit<Seller, 'products'>

const SellerCard: React.FC<Props> = ({ name, mobile, email }) => {
    return <div>
        <p>seller card</p>
        <p>name: {name}</p>
        <p>contact info: {mobile}, {email}</p>
    </div>
}

export default SellerCard