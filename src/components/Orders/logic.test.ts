import {Seller, Measurement} from '../../defs';
import {ProductWithSellerData, getAllProductsFromSellers} from './logic';

describe('getAllProductsFromSellers', () => {
    test('Basic Usage', () => {
        const seller: Seller = {
            name: 'seller name',
            id: 'seller id',
            products: [
                {
                    name: 'product name',
                    id: 'product id',
                    measurement: Measurement.GRAMS
                }
            ]
        }

        const expectedProduct: ProductWithSellerData = {
            ...seller.products[0],
            sellerId: seller.id,
            sellerName: seller.name
        }
        const products = getAllProductsFromSellers([seller]);
        
        expect(products[0]).toMatchObject(expectedProduct);
        expect(expectedProduct).toMatchObject(products[0]);


    })
})