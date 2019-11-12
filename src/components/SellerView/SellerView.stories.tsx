import React from 'react';
import {storiesOf} from '@storybook/react'

import SellerView from './SellerView';

storiesOf('SellerView', module)
    .add('basic', () => <SellerView />)