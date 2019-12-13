import React from 'react';
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';

import ApplicationBar from './ApplicationBar';
import ContextAndBrowserWrapper from '../TestingComponents/ContextAndBrowserWrapper';



storiesOf('ApplicationBar', module)
    .add('default', () => <ContextAndBrowserWrapper>
        <ApplicationBar caption={text('caption', 'something')} />
    </ContextAndBrowserWrapper>)