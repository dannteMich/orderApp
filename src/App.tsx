import React from 'react';
import {Container} from '@material-ui/core';
import {Order} from './defs'
import ApplicationBar from './components/ApplicationBar';
import OrderList from './components/OrderList/OrderList';

const mockOrders: Order[] = [
  {
    product: {
      name: "Apples",
    },
    amount: 3,
  },
  {
    product: {
      name: "Pears",
    },
    amount: 5,
  },
] 

const App: React.FC = () => {
  
  return (
    <div>
      <ApplicationBar />

      <Container>
        <OrderList orders={mockOrders}/>
      </Container>
    </div>
  );
}

export default App;
