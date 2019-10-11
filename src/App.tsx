import React from 'react';
import {Container} from '@material-ui/core';
import {Product, Measurement} from './defs'

const mockOrders: Product[] = [
  {
    name: "Apples",
    measurement: Measurement.KG,
  }
]

const App: React.FC = () => {
  
  return (
    <Container>
      "hello world"
    </Container>
  );
}

export default App;
