import React, { useState, useEffect } from 'react';
import './App.css';
import { NavBar } from './components';
import Router from './Routes';

function App() {
  const [cart, setCart] = useState({});
  return (
    <div className="App">
      <div className='nav-bar'>
        <NavBar/>
      </div>
      <div className='router'>
        <Router
          cart={cart}
          setCart={ setCart }
        />
      </div>
    </div>
  );
}

export default App;
