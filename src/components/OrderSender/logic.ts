import pluralize from 'pluralize'
import { SingleSellerOrder } from "../../defs";
import _ from 'lodash';

export function singleSellerOrderToStringList(order: SingleSellerOrder) {
    return _.map(order, 
        (productOrder) => `${productOrder.name}: ${pluralize(productOrder.measurement, productOrder.amount, true)}`)
}

export function singleSellerOrderAsText(order: SingleSellerOrder) {
    return singleSellerOrderToStringList(order).join('\n')
}