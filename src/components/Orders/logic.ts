
import {Product, Seller, Order} from '../../defs';
import { createSelector, } from 'reselect';
import _ from 'lodash';

export interface ProductWithSellerData extends Product {
    sellerId: string;
    sellerName: string;
}

export function getAllProductsFromSellers(sellers: Seller[]) { // TODO: should I memoize this?
    const res = [] as ProductWithSellerData[];
    sellers.forEach(seller => seller.products.forEach(product => {
        res.push({
            ...product,
            sellerId: seller.id,
            sellerName: seller.name,
        })
    }))
    return res;
}

export function addItemToOrder(order: Order, sellerId: string, productId: string, amount: number){
    return order.concat([{ productId, sellerId, amount }])
};

export function removeItemFromOrder(order: Order, sellerId: string, productId: string) {
    return order.filter(item => item.sellerId !== sellerId || item.productId !== productId);
}

export const getProductsSelection = createSelector( // takes sellers and orders
    (sellers: Seller[], order: Order) => getAllProductsFromSellers(sellers),
    (sellers: Seller[], order: Order) => new Set(order.map(order => order.productId)),

    (productsAvailable: ProductWithSellerData[], productsInOrder: Set<string>) => {
        return productsAvailable.filter(product => !productsInOrder.has(product.id))
    }
)

export const getOrdersBySellerId = createSelector(
    (orders: Order) => orders,
    (orders: Order) => _.groupBy(orders, order => order.sellerId),
)

