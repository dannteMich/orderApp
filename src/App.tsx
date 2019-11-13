import React from 'react';

import {Route, Switch} from 'react-router-dom';

import ApplicationBar from './components/ApplicationBar';
import AccountView from './components/AccountView/AccountViewContainer';
import SellerView from './components/SellerView/SellerViewContainer';


const App: React.FC = () => {
  
  return (
    
    <div>
      <ApplicationBar caption="Account Management" />
      <Switch>
        <Route path="/" exact render={() => <AccountView/>} />
        <Route path="/sellers/:id" render={({match}) => <SellerView sellerId={match.params.id}/>} />
      </Switch>
    </div>
  );
}

export default App;
