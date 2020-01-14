
import {Product, Seller, Order, SingleSellerOrder} from '../../defs';
import { createSelector, } from 'reselect';
import _ from 'lodash';
import { StoreMallDirectoryRounded } from '@material-ui/icons';

export interface ProductWithSellerData extends Product {
    sellerId: string;
    sellerName: string;
}

export function getAllProductsFromSellers(sellers: Seller[]) { // TODO: should I memoize this?
    const res = [] as ProductWithSellerData[];
    sellers.forEach(seller => _.forEach(seller.products, product => {
        res.push({
            ...product,
            sellerId: seller.id,
            sellerName: seller.name,
        })
    }))
    return res;
}

export function getAllProductIdsInOrder(order: Order) {
    return _.flatten(
        _.values(order).map(sellerOrder => _.keys(sellerOrder))
    )
}

export function addItemToOrder(order: Order, sellerId: string, product: Product, amount: number){
    const newOrder = Object.assign({}, order);
    if (!_.has(newOrder, sellerId)) {
        newOrder[sellerId] = {};
    }
    
    newOrder[sellerId][product.id] = {...product, sellerId: sellerId, amount: amount};
    return newOrder
};

export function removeItemFromOrder(order: Order, sellerId: string, productId: string) {
    const newOrder = Object.assign({}, order);
    delete newOrder[sellerId][productId]
    if (_.isEmpty(order[sellerId])) {
        delete order[sellerId];
    }
    return newOrder;
}

export const getProductsSelection = createSelector( // takes sellers and orders
    (sellers: Seller[], order: Order) => getAllProductsFromSellers(sellers),
    (sellers: Seller[], order: Order) => new Set(getAllProductIdsInOrder(order)),

    (productsAvailable: ProductWithSellerData[], productsInOrder: Set<string>) => {
        return productsAvailable.filter(product => !productsInOrder.has(product.id))
    }
)
