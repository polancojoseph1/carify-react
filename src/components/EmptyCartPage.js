import styles from './styles/EmptyCartPage.module.css'
import emptyCartLogo from '../icon/empty-cart-2.png'
import { Link } from 'react-router-dom';

function EmptyCartPage(props) {
  return (
    <div className={styles.EmptyCartPage}>
      <div className={styles.emptyCartLogoSection}>
        <img className={styles.logo} src={emptyCartLogo} />
      </div>
      <div className={styles.emptyCartTextSection}>
        <div className={styles.emptyCartText}>
          Your cart is currently empty.
        </div>
        <div className={styles.emptyCartDescription}>
          Looks like you haven't added anything to your cart yet. Explore some items to get started.
        </div>
        <div className={styles.returnToShopButtonSection}>
          <Link className={styles.returnToShopLink} to='/product'>
            <button className={styles.returnToShopButton}>
              Return to Shop
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmptyCartPage;