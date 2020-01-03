
import {Product, Seller} from '../../defs';

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