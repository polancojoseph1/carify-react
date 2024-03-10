import styles from './styles/Filter.module.css'
import { 
  getAllProductsByPrice,
  getAllProductsByRating,
  getAllProductsByColor
} from '../apiAccessor'
import { api } from '../axiosConfig';

function Filter(props) {
  const {
    products,
    setProducts
  } = props;

  const handlePrice = async () => {
    const selectedProducts = await getAllProductsByPrice(api);
    setProducts(selectedProducts)
  }

  const handleRating = async () => {
    const selectedProducts = await getAllProductsByRating(api);
    setProducts(selectedProducts)
  }

  const handleColor = async (color) => {
    const selectedProducts = await getAllProductsByColor(color, api);
    console.log(selectedProducts.map(e => e.color), "hit color")
    setProducts(selectedProducts)
  }
  return (
    <div className={styles.Filter}>
      <div className={styles.filterSection}>
        <div className={styles.filterOptions}>
          <div className={styles.filterOption}>
            <h3 onClick={handlePrice}>Affordable</h3>
          </div>
          <div className={styles.filterOption}>
            <h3 onClick={handleRating}>Top Rating</h3>
          </div>
          <div className={styles.filterOption}>
            <h3 onClick={() => handleColor('Black')}>Black</h3>
          </div>
          <div className={styles.filterOption}>
            <h3 onClick={() => handleColor('White')}>White</h3>
          </div>
          <div className={styles.filterOption}>
            <h3 onClick={() => handleColor('Grey')}>Grey</h3>
          </div>
          <div className={styles.filterOption}>
            <h3 onClick={() => handleColor('Color')}>Other Colors</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
