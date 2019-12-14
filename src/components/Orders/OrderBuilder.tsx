import React from 'react';
import { Seller } from '../../defs';
import { Typography } from '@material-ui/core';

interface Props {
    sellers: Seller[];
}

const OrderBuilder: React.FC<Props> = ({sellers}) => {
    return <div>
        <Typography variant="h5">
            Product to add
        </Typography>
        
    </div>;
}

export default OrderBuilder;