import styles from './styles/Checkout.module.css'
import CheckoutForm from './CheckoutForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function Checkout(props) {
  const {
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity,
    setQuantity,
  } = props

  const navigate = useNavigate();

  useEffect(() => {
    if (!quantity) {
      navigate('/')
    }
  }, []);
  return (
    <div className={styles.Checkout}>
      <div className={styles.checkoutTitle}>
        <div className={styles.checkoutTitleText}>
          Checkout Section
        </div>
      </div>
      <div className={styles.checkoutForm}>
        <CheckoutForm
          setCart={setCart}
          setCartProducts={setCartProducts}
          setQuantity={setQuantity}
        />
      </div>
    </div>
  );
}

export default Checkout;
