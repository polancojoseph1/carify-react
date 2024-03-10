import styles from './styles/ProductsIcon.module.css'
import carIcon from '../icon/caricon.webp'
import { Link } from 'react-router-dom';

function ProductsIcon() {
  return (
    <div className={styles.ProductsIcon}>
      <Link to={`/product/`} className={styles.link} title='View Products'>
        <img src={carIcon}
          alt='Car Icon'
          className={styles.icon}
        />
      </Link>
    </div>
  );
}

export default ProductsIcon;