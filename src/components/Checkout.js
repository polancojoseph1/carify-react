import styles from './styles/Checkout.module.css'

function Checkout(props) {
  const {
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity,
    setQuantity,
  } = props
  return (
    <div className={styles.Checkout}>
      hello world
    </div>
  );
}

export default Checkout;
