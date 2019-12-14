import React from 'react';
import {storiesOf} from '@storybook/react';
import {object} from '@storybook/addon-knobs'

import OrderBuilder from './OrderBuilder';
import {seller1, seller2} from '../../TestingUtils/mockData';

storiesOf('Orders', module)
    .add('Base', () => <OrderBuilder sellers={object('sellers', [seller1, seller2])}/>);