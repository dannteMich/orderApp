import React, {useState} from 'react';
import {createSelector} from 'reselect';
import { Seller, OrderItem} from '../../defs';
import ProductSelect from './ProductSelect';
import { ProductWithSellerData, getAllProductsFromSellers} from './logic';

const productsToShow = createSelector( // takes sellers and orders
    (sellers: Seller[], orders: OrderItem[]) => getAllProductsFromSellers(sellers),
    (sellers: Seller[], orders: OrderItem[]) => new Set(orders.map(order => order.productId)),
    (productsAvailable: ProductWithSellerData[], productsInOrder: Set<string>) => {
        return productsAvailable.filter(product => !productsInOrder.has(product.id))
    }
)

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

    return <ProductSelect 
        products={productsToShow(sellers, orders)} 
        onSelect={addProductToOrder}
    />
}



export default OrderBuilder;