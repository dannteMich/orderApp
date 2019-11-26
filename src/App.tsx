import React from 'react';

import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import firebase from './commonLogical/firebase';
import { mockUser } from './mockData';            // TODO: comment this before build

import ApplicationBar from './components/ApplicationBar';
import AccountView from './components/AccountView/AccountViewContainer';
import SellerView from './components/SellerView/SellerViewContainer';
import SignIn from './components/signIn/SignIn';

const SINGIN_PATH = '/signin'

const App: React.FC = () => {
  // const user = firebase.auth().currentUser; // TODO: uncomment this before build
  const user = mockUser;

  const [history, location] = [useHistory(), useLocation()];
  if (user === null && location.pathname !== SINGIN_PATH) {
    history.replace(SINGIN_PATH)
  }

  return (
    
    <div>
      <ApplicationBar caption="Account Management" />
      <Switch>
        <Route path="/" exact render={() => <AccountView/>} />
        <Route path="/sellers/:id" render={({match}) => <SellerView sellerId={match.params.id}/>} />
        <Route path={SINGIN_PATH}  render={() => <SignIn />}/>
      </Switch>
    </div>
  );
}

export default App;
