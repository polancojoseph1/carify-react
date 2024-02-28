import styles from './styles/Cart.module.css'
import { api } from '../axiosConfig';
import { useEffect, useState } from 'react';
import {
  getUserIdByStorage,
  getCartProductsByCartId,
  getCartByUserId
} from '../apiAccessor';
import CartProductCard from './CartProductCard';

function Cart(props) {
  const {
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity: totalQuantity,
    setQuantity: setTotalQuantity
  } = props

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function renderCartProducts() {
      const userId = getUserIdByStorage();
      let selectedCart = cart;
      if ((!selectedCart || !selectedCart['id']) && userId) {
        selectedCart = await getCartByUserId(userId, api)
        setCart(selectedCart)
      }
      if (selectedCart && selectedCart['id']) {
        const selectedCartProducts = await getCartProductsByCartId(selectedCart['id'], api)
        setCartProducts(selectedCartProducts)
      }
    }
    renderCartProducts();
    },
    [
      (cartProducts || []).length,
      totalPrice
    ]);
  return cartProducts && cartProducts.length ? (
    <div className={styles.Cart}>
      <div className={styles.cartProducts}>
        {cartProducts.map((cartProduct, index) => {
          return (
          <div className={styles.cartProduct} key={index}>
            <CartProductCard
                cart={cart}
                setCart={setCart}
                cartProduct={cartProduct}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                totalQuantity={totalQuantity}
                setTotalQuantity={setTotalQuantity}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
            />
          </div>
        )})}
      </div>
      <div className={styles.totalPrice}>
        Total Price: {totalPrice}
      </div>
    </div>
  ) : (
      <div>
        Sorry no cart found
      </div>
  );
}

export default Cart;
