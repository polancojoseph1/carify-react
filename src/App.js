import React, { useState, useEffect } from 'react';
import './App.css';
import { NavBar } from './components';
import Router from './Routes';
import { api } from './axiosConfig';
import {
  getUserIdByStorage,
  getCartByUserId,
  getCartProductsByCartId
} from './apiAccessor';

function App() {
  const [cart, setCart] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [
    quantity,
    setQuantity
  ] = useState(0);
  useEffect(() => {
    async function renderCartData() {
        const userId = getUserIdByStorage();
        if (userId) {
          const selectedCart = await getCartByUserId(
            userId,
            api
          )
          setCart(selectedCart)
          if (selectedCart && selectedCart.id) {
            const selectedCartProducts = await getCartProductsByCartId(
              selectedCart.id,
              api
            )
            setCartProducts(selectedCartProducts)
          }
        };
      }
      renderCartData();
  }, [])
  return (
    <div className="App">
      <div className='router'>
        <Router
          cart={cart}
          setCart={setCart}
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
          quantity={quantity}
          setQuantity={setQuantity}
          products={products}
          setProducts={setProducts}
        />
      </div>
    </div>
  );
}

export default App;
