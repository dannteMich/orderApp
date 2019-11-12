import React from 'react';

import {Container} from '@material-ui/core'

interface Props {
    seller_id: string;
}

const SellerView: React.FC<Props> = ({seller_id}) => {
    return <Container>
        Seller view element: {seller_id}
    </Container>
}

export default SellerView;