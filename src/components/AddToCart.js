import React, { useEffect, useState } from 'react';
import { api, auth} from '../axiosConfig';
import styles from './styles/AddToCart.module.css'
import {
  createGuest,
  getUserIdByStorage,
  setUserIdByStorage,
  getCartByUserId,
  createCart,
  createCartProduct,
  getCartProductsByCartId,
  getCartProductByCartIdAndProductId,
  updateCartProductAdd
} from '../apiAccessor'

function AddToCart(props) {
  const {
    product,
    cart,
    setCart,
    setCartProducts,
    quantity,
    setQuantity
  } = props;
  const [cartProduct, setCartProduct] = useState({})
  useEffect(() => {
    async function renderUserId() {
      const userId = getUserIdByStorage();
      if (!userId) {
        const guestUserId = await createGuest(auth);
        setUserIdByStorage(guestUserId)
      }
    }
    renderUserId();
  }, []);

  const handleAddToCart = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const userId = getUserIdByStorage()
    let selectedCart = await getCartByUserId(
      userId,
      api
    )
    if (!selectedCart) {
      selectedCart = await createCart(
        userId,
        "active",
        null,
        api
      )
    }
    const selectedCartProduct = await getCartProductByCartIdAndProductId(selectedCart['id'], product['id'], api)
    if (selectedCartProduct['quantity'] >= product['quantity']) {
      return;
    }
    if (!selectedCartProduct) {
      await createCartProduct(
        (selectedCart || {})['id'],
        product['id'],
        1,
        product['price'],
        api
      )
    } else {
      await updateCartProductAdd(
        selectedCart['id'],
        product['id'],
        1,
        product['price'],
        api
      )
    }
    setQuantity(quantity + 1);
    const selectedCartProducts = await getCartProductsByCartId(selectedCart['id'], api)
    setCartProducts(selectedCartProducts)
  };
  return (
    <button className={styles.AddToCart} onClick={handleAddToCart}>
      Add To Cart
    </button>
  );
}

export default AddToCart;