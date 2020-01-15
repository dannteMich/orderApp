import {Seller, Measurement, Order, DbOrder} from '../../defs';
import { ProductWithSellerData, getAllProductsFromSellers, reduceOrderToDbForm} from './logic';

describe('getAllProductsFromSellers', () => {
    test('Basic Usage', () => {
        const seller: Seller = {
            name: 'seller name',
            id: 'seller id',
            products: {
                'product id': {
                    name: 'product name',
                    id: 'product id',
                    measurement: Measurement.GRAMS
                }
            }
        };
        const expectedProduct: ProductWithSellerData = {
            ...seller.products['product id'],
            sellerId: seller.id,
            sellerName: seller.name
        }
        const products = getAllProductsFromSellers([seller]);
        
        expect(products[0]).toMatchObject(expectedProduct);
        expect(expectedProduct).toMatchObject(products[0]);
    })
})

describe('reduceOrderToDbForm', () => {
    test('basic usage', () => {
        const order: Order = {
            'seller_id': {
                'product_id': {
                    name: 'product',
                    id: 'product_id',
                    sellerId: 'seller_id',
                    amount: 5,
                    measurement: Measurement.GRAMS
                }
            }
        }
        const expectedOrder: DbOrder = [
            {
                productId: 'product_id',
                sellerId: 'seller_id',
                amount: 5,
            }
        ]
        const dbOrderFromOrder = reduceOrderToDbForm(order);
        expect(dbOrderFromOrder).toMatchObject(expectedOrder);
        expect(expectedOrder).toMatchObject(dbOrderFromOrder);
    })
})