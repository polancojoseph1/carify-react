import styles from './styles/Top3Products.module.css'
import {
  getAllProductsByRating
} from '../apiAccessor'
import { api } from '../axiosConfig';
import {
  useEffect,
  useState
} from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

function Top3Products(props) {
  const {
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity,
    setQuantity
  } = props;

  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    async function renderTopProducts() {
      const selectedProducts = await getAllProductsByRating(api);
      setTopProducts((selectedProducts || []).slice(0, 3));
    }
    renderTopProducts();
  }, [])

  return (
    <div className={styles.Top3Products}>
      <h2 className={styles.title}>View Top 3 Products</h2>
      <div className={styles.topProducts}>
        {(topProducts || []).map((product, index) => {
          return (
              <div className={styles.topProduct} key={index}>
                <ProductCard
                  key={index}
                  product={product}
                  cart={cart}
                  setCart={setCart}
                  cartProducts={cartProducts}
                  setCartProducts={setCartProducts}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </div>
          )
        })}
      </div>
    </div>
  );
}

export default Top3Products;
