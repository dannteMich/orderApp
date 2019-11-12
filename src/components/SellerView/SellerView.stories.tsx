import React from 'react';
import {storiesOf} from '@storybook/react';
import {text} from '@storybook/addon-knobs';

import SellerView from './SellerView';

storiesOf('SellerView', module)
    .add('basic', () => <SellerView seller_id={text('seller_id', 'dev')}/>)