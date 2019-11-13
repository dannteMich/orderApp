import React from 'react';
import {storiesOf} from '@storybook/react';
import {text} from '@storybook/addon-knobs';

import SellerViewComponent from './SellerViewComponent';
import { seller1 } from '../../mockData';

storiesOf('SellerView', module)
    .add('basic', () => <SellerViewComponent {...seller1}/>)