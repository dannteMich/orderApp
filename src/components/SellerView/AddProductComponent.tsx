import React from 'react';

import {Product} from '../../defs';


interface Props {
    validateProduct: (product: Partial<Product>) => void;
    handleCreatePromise: (product: Product) => Promise<boolean>;
}

const AddProductComponent: React.FC<Props> = ({validateProduct, handleCreatePromise}) => {
    return <div>
        AddSellerComponent
    </div>
}

export default AddProductComponent;