import React from 'react';
import {storiesOf} from '@storybook/react'
import {text} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions';

import SellerCard from './SellerCard';


storiesOf('SellerCard', module)
  .add('default', () => {
    return <SellerCard 
      seller={{
        name: text("name", "Best Shop For food"),
        email: text("email", "Some@someprovider.com"),
        whatsapp: text("mobile", "0505050500"),
      }} 
      onClick={action('clicked on seller')}/>})


