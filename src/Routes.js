import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AllProducts,
  Home,
  ProductDetails
} from './components'

function Router(props) {
  const {cart, setCart} = props
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/product" element={<AllProducts
            cart={cart}
            setCart={setCart}
        />} />
        <Route path="/product/:id" element={<ProductDetails 
            cart={cart}
          setCart={setCart}
        />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;