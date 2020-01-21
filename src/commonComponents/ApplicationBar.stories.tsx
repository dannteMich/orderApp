import React from 'react';
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';

import ApplicationBar from './ApplicationBar';
import ContextAndBrowserWrapper from '../TestingUtils/ContextAndBrowserWrapper';



storiesOf('ApplicationBar', module)
    .add('without user', () => <ContextAndBrowserWrapper userId="">
        <ApplicationBar caption={text('caption', 'something')} />
    </ContextAndBrowserWrapper>)
    .add('with user', () => <ContextAndBrowserWrapper>
        <ApplicationBar caption={text('caption', 'something')} />
    </ContextAndBrowserWrapper>)