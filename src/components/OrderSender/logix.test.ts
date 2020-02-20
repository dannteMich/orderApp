import {singleSellerOrderToStringList} from './logic';
import { SingleSellerOrder, Measurement } from '../../defs';

const mockSingleSellerOrder: SingleSellerOrder = {
    applesId: { // normal
        name: "Apples",
        amount: 3,
        id: "applesId",
        measurement: Measurement.GRAMS,
        sellerId: "seller",
    },
    pearsId: { // singular
        name: "Pears",
        amount: 1,
        id: "pearsId",
        measurement: Measurement.GRAMS,
        sellerId: "seller",
    }
}

describe(singleSellerOrderToStringList, () => {
     test('sanity', () => {
        const expected_lines = [
            "Apples: 3 grams",
            "Pears: 1 gram",
        ]
        
        const orderAsStringList = singleSellerOrderToStringList(mockSingleSellerOrder);
        expect(orderAsStringList.length).toBe(expected_lines.length);
        orderAsStringList.forEach(
            line => expect(expected_lines).toContain(line));
     })
})