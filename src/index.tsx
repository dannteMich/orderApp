import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'

import {AccountIdContext} from './commonLogical/contexts';

import { DEV_ACCOUNT_NAME } from './mockData'; // TODO: later from sign in

ReactDOM.render(
    <AccountIdContext.Provider value={DEV_ACCOUNT_NAME}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AccountIdContext.Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
