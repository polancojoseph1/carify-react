import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AllProducts,
  Home,
  ProductDetails,
  Cart,
  NavBar
} from './components'

function Router(props) {
  const {
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity,
    setQuantity
  } = props
  return (
    <BrowserRouter>
      <div className='nav-bar'>
        <NavBar
          cart={cart}
          setCart={setCart}
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/product" element={<AllProducts
            cart={cart}
            setCart={setCart}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            quantity={quantity}
            setQuantity={setQuantity}
        />} />
        <Route path="/product/:id" element={<ProductDetails 
            cart={cart}
            setCart={setCart}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            quantity={quantity}
            setQuantity={setQuantity}
        />} />
        <Route path="/cart/:id" element={<Cart 
            cart={cart}
            setCart={setCart}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            quantity={quantity}
            setQuantity={setQuantity}
        />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;