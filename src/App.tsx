import React from 'react';

import {Route} from 'react-router-dom';

import { DEV_ACCOUNT_NAME } from './mockData'; // TODO: move this to context?

import ApplicationBar from './components/ApplicationBar';
import AccountView from './components/AccountView/AccountView';
import SellerView from './components/SellerView/SellerView';


const App: React.FC = () => {
  
  return (
    
    <div>
      <ApplicationBar caption="Account Management" />
      <Route path="/" exact render={() => <AccountView accountId={DEV_ACCOUNT_NAME} />} />
      <Route path="/sellers" component={SellerView} />
    </div>
  );
}

export default App;
