import React from 'react';
import {storiesOf} from '@storybook/react'


import SelledCard from './SellerCard';

export const aSeller = {
  name: "someone",
  mobile: "050050505050",
  email: "anEmail@gmail.com"
}

storiesOf('Seller\\SellerCard', module)
  .add('default', () => <SelledCard {...aSeller}/>)


