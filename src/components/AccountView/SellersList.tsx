import React from 'react';
import {Seller} from '../../defs';
import SellerCard from './SellerCard';


interface Props {
    sellers: Seller[];
}

const SellersList: React.FC<Props> = ({sellers}) => {
    const sellerCards = sellers.map((seller, i) => <SellerCard {...seller} key={i}/>)
    return <div>
        sellers list
        <div>
            {sellerCards};
        </div>
    </div>
}


export default SellersList