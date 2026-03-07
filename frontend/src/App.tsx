import React from 'react';
import logo from './logo.svg';
import './App.css';
import NewBasket from './components/NewBasket'
import MyBaskets from './components/MyBaskets'

function App() {
  return (
    <div className="App">
      <div className="component-container">
        <div className="new-basket-panel">
          <NewBasket />
        </div>
        <div className="my-baskets-panel">
          <MyBaskets />
        </div>
      </div>
    </div>
  );
}

export default App;
