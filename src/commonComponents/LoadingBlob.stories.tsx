import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs'

import LoadingBlob from './LoadingBlob';

storiesOf('Loading', module)
    .add('Without text', () => <LoadingBlob />)
    .add('With text', () => <LoadingBlob 
        topMessage={text('top message', 'loading...')}
        bottomMessage={text('bottom message', 'and waiting!')}
    />)