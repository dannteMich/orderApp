import React from 'react';
import {Container} from '@material-ui/core';
import ApplicationBar from './components/ApplicationBar';
import OrderList from './components/OrderList/OrderList';


const App: React.FC = () => {
  
  return (
    <div>
      <ApplicationBar />

      <Container>
        <OrderList/>
      </Container>
    </div>
  );
}

export default App;
