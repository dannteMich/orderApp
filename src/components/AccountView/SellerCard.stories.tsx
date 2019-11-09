import React from 'react';
import {storiesOf} from '@storybook/react'
import {text} from '@storybook/addon-knobs'

import SelledCard from './SellerCard';

storiesOf('SellerCard', module)
  .add('default', () => <SelledCard 
    name={text("name", "Best Shop For food")}
    email={text("email", "Some@someprovider.com")}
    mobile={text("mobile", "0505050500")}
  />)


