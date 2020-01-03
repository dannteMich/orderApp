import React, {useState} from 'react';
import {createSelector} from 'reselect';
import { Seller, OrderItem} from '../../defs';
import ProductSelect from './ProductSelect';
import { ProductWithSellerData, getAllProductsFromSellers} from './logic';


interface Props {
    sellers: Seller[];
}

const OrderBuilder: React.FC<Props> = ({sellers}) => {
    const [orders, setOrders] = useState<OrderItem[]>([]);
    

    const addProductToOrder = (product: ProductWithSellerData) => {
        const newOrders = orders.concat([{
            productId: product.id,
            sellerId: product.sellerId,
            amount: 1,
        }]);
        setOrders(newOrders);
    };
    console.log('productsInOrder');
    console.log(orders);

    const itemsInOrders = new Set(orders.map(order => order.productId));
    const productsToShow = getAllProductsFromSellers(sellers)
        .filter(product => !itemsInOrders.has(product.id))

    return <ProductSelect 
        products={productsToShow} 
        onSelect={addProductToOrder}
    />
}



export default OrderBuilder;