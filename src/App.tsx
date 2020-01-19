import React, { useContext } from 'react';

import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {userContext} from './commonLogical/contexts';

import ApplicationBar from './commonComponents/ApplicationBar';
import AccountView from './components/AccountView/AccountViewContainer';
import SellerView from './components/SellerView/SellerViewContainer';
import SignIn from './components/SpecialRoutes/SignIn';
import RootRoute from './components/SpecialRoutes/RootRoute';
import OrderBuilderContainer from './components/Orders/OrderBuilderContainer';

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
      <Route path="/" exact render={() => <RootRoute />} />
      <Route path="/accounts/:accountId" exact render={({match}) => <AccountView accountId={match.params.accountId}/>} />
      <Route 
        path="/accounts/:accountId/sellers/:sellerId" 
        render={({ match }) => <SellerView accountId={match.params.accountId} sellerId={match.params.sellerId} />} 
      />
      <Route path="/accounts/:accountId/order" render={({match}) => <OrderBuilderContainer accountId={match.params.accountId}/>} />
      <Route path={SINGIN_PATH} render={() => <SignIn />} />
    </Switch>
  </div>
}
// TODO: handle when you don't have an account

export default App;
