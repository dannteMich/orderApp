import { Seller, Measurement, Order, DbOrder, sellersMapping} from '../../defs';
import {
    ProductWithSellerData, 
    getAllProductsFromSellers, 
    reduceOrderToDbForm, 
    expandDbOrderToOrder
} from './logic';

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

describe('Order to dbOrder and back', () => {
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

    const sellersMap: sellersMapping = {
        'seller_id': {
            id: 'seller_id',
            name: 'seller_name',
            products: {
                'product_id': {
                    name: 'product',
                    id: 'product_id',
                    measurement: Measurement.GRAMS
                }
            }
        }
    }

    const dbOrder: DbOrder = [
        {
            productId: 'product_id',
            sellerId: 'seller_id',
            amount: 5,
        }
    ];

    test('basic reduceOrderToDbForm', () => {
        const dbOrderFromOrder = reduceOrderToDbForm(order);

        expect(dbOrderFromOrder).toMatchObject(dbOrder);
        expect(dbOrder).toMatchObject(dbOrderFromOrder);
    })
    test('basic expandDbOrderToOrder', () => {
        const orderFromDbOrder = expandDbOrderToOrder(dbOrder, sellersMap);

        expect(orderFromDbOrder).toMatchObject(order);
        expect(order).toMatchObject(orderFromDbOrder);
    });


});

