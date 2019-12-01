import React, { useContext } from 'react';

import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {userContext} from './commonLogical/contexts';

import ApplicationBar from './commonComponents/ApplicationBar';
import AccountView from './components/AccountView/AccountViewContainer';
import SellerView from './components/SellerView/SellerViewContainer';
import SignIn from './components/SpecialRoutes/SignIn';

const SINGIN_PATH = '/signin'

const App: React.FC = () => {

  const { userId } = useContext(userContext);

  const [history, location] = [useHistory(), useLocation()]; // should replace with guard component?
  if (!userId  && location.pathname !== SINGIN_PATH) {
    history.replace(SINGIN_PATH)
  }

  return <div>
    <ApplicationBar caption="Account Management" />
    <Switch>
      <Route path="/" exact render={() => <AccountView />} />
      <Route path="/sellers/:id" render={({ match }) => <SellerView sellerId={match.params.id} />} />
      <Route path={SINGIN_PATH} render={() => <SignIn />} />
    </Switch>
  </div>
}

export default App;
