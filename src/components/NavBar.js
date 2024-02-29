import styles from './styles/NavBar.module.css'
import CartIcon from './CartIcon'
import ProductsIcon from './ProductsIcon';
import { Link } from 'react-router-dom';

function NavBar(props) {
  const {
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity,
    setQuantity,
  } = props
  return (
    <div className={styles.NavBar}>
      <div className={styles.items}>
        <div className={styles.productsIcon}>
          <ProductsIcon/>
        </div>
        <div className={styles.cartIcon}>
          <CartIcon
            cart={cart}
            setCart={setCart}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
