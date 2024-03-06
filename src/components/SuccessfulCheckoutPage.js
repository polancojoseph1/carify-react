import styles from './styles/SuccessfulCheckoutPage.module.css'
import { Link } from 'react-router-dom';
import checkmark from '../icon/checkmark.webp'

function SuccessfulCheckoutPage(props) {
  return (
    <div className={styles.SuccessfulCheckoutPage}>
      <img className={styles.checkmark} src={checkmark} />
      <div className={styles.successText}>
        Your order has been successfully completed!
      </div>
      <div className={styles.returnToShopButtonSection}>
        <Link className={styles.returnToShopLink} to='/product'>
          <button className={styles.returnToShopButton}>
            Return to Shop
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessfulCheckoutPage;