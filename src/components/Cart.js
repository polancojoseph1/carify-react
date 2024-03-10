import styles from './styles/Cart.module.css'
import { api } from '../axiosConfig';
import { useEffect, useState } from 'react';
import {
  getUserIdByStorage,
  getCartProductsByCartId,
  getCartByUserId
} from '../apiAccessor';
import CartProductCard from './CartProductCard';
import EmptyCartPage from './EmptyCartPage';
import { Link } from 'react-router-dom';
import Top3Products from './Top3Products';

function Cart(props) {
  const {
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity: totalQuantity,
    setQuantity: setTotalQuantity
  } = props
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data)
    setTimeout(() => {
      setLoading(false); // Set loading to false when the operation is complete
    }, 2000); // Simulate a 2-second delay
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount


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
        console.log(selectedCartProducts, "selectedCartProducts")
        setCartProducts(selectedCartProducts)
      }
    }
    renderCartProducts();
    },
    [
      (cartProducts || []).length,
      totalPrice
    ]);
  console.log(cartProducts, "cartProducts")
  return cartProducts && cartProducts.length ? (
    <div className={styles.Cart}>
      <h1 className={styles.cartHeader}>
        Your Cart
      </h1>
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
      <div className={styles.cartFooter}>
        <div className={styles.totalPriceContainer}>
          <div className={styles.totalPriceLabel}>
            Subtotal ({totalQuantity} {
              totalQuantity === 1 ?
                'item' :
                'items'
            }):&nbsp;
          </div>
          <div className={styles.totalPriceValue}>
            ${totalPrice}
          </div>
        </div>
        <div className={styles.checkoutSection}>
          <Link
            to={`/checkout/${(cart || {}).id}`}
            state={{
              totalPrice: totalPrice,
              totalQuantity: totalQuantity
            }}
            className={styles.link}
            title='Proceed To Checkout'
          >
            <button className={styles.proceedToCheckout}>
              Proceed To Checkout
            </button>
          </Link>
        </div>
      </div>
      <Top3Products />
    </div>
  ) : (
      <div className={styles.emptyCartPage}>
        {
          (loading ?
            <div></div>
            :
            <EmptyCartPage />)

        }
      </div>
  );
}

export default Cart;
