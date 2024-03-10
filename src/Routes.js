import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AllProducts,
  Home,
  ProductDetails,
  Cart,
  NavBar,
  Checkout,
  UserPage,
  SuccessfulCheckoutPage,
  Filter
} from './components'

function Router(props) {
  const {
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity,
    setQuantity,
    products,
    setProducts
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
            products={products}
            setProducts={setProducts}
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
        <Route path="/checkout/:cartId" element={<Checkout 
            cart={cart}
            setCart={setCart}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            quantity={quantity}
            setQuantity={setQuantity}
        />} />
        <Route path="/user/:id" element={<UserPage />}
            cart={cart}
        />
        <Route path="/success" element={<SuccessfulCheckoutPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;