import styles from './styles/CartIcon.module.css'
import cartLogo from '../icon/cart.png'
import {
  getCartProductsByCartId,
  getCartByUserId,
  getUserIdByStorage
} from '../apiAccessor';
import { useState, useEffect } from 'react';
import { api } from '../axiosConfig';
import { Link } from 'react-router-dom';

function CartIcon(props) {
  const {
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity,
    setQuantity,
  } = props;
  useEffect(() => {
    async function renderCartData() {
      const userId = getUserIdByStorage();
      if (userId) {
        const selectedCart = await getCartByUserId(
          userId,
          api
        )
        setCart(selectedCart)
        if (selectedCart) {
          const selectedCartProducts = await getCartProductsByCartId(
            selectedCart.id,
            api
          ) || []
          setCartProducts(selectedCartProducts)
          if (selectedCartProducts.length) {
            let count = 0
            for (let i = 0; i < selectedCartProducts.length; i++) {
              const cartProduct = selectedCartProducts[i]
              count += cartProduct.quantity
            }
            setQuantity(count)
          } else {
            setQuantity(0)
          }
        }
      }
    }
    renderCartData()
  }, [(cartProducts || []).length]);
  return (
    <div className={styles.CartIcon}>
      <Link to={`/cart/${(cart || {}).id}`} className={styles.link}>
        {
          quantity ?
            (
              <div className={styles.quantity}>
                {quantity}
              </div>
            )
            :
          (<div></div>)
        }

        <img src={cartLogo}
          alt='Cart Logo'
          className={styles.logo}
        />
      </Link>
    </div>
  );
}

export default CartIcon;