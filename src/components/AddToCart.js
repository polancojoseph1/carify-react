import React, { useEffect, useState } from 'react';
import { api, auth} from '../axiosConfig';
import './styles/AddToCart.css'
import {
  createGuest,
  getUserIdByStorage,
  setUserIdByStorage,
  getCartByUserId,
  createCart,
  createCartProduct
} from '../apiAccessor'

function AddToCart(props) {
  const { product, cart, setCart } = props;
  useEffect(() => {
    const userId = getUserIdByStorage();
    if (!userId) {
      createGuest(auth, setUserIdByStorage);
    }
  }, []);

  const handleAddToCart = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const userId = getUserIdByStorage()
    await getCartByUserId(
      userId,
      setCart,
      api
    )
    if (!cart || !cart.id) {
      await createCart(
        userId,
        setCart,
        "active",
        null,
        api
      )
    }
    await createCartProduct(
      cart['id'],
      product['id'],
      1,
      product['price'],
      api
    )
  };
  return (
    <button className="AddToCart" onClick={handleAddToCart}>
      Add To Cart
    </button>
  );
}

export default AddToCart;