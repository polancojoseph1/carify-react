import {Link} from 'react-router-dom';
import styles from './styles/ProductRow.module.css'
import ProductCard from './ProductCard';

function ProductRow(props) {
  const {
    threeProducts,
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity,
    setQuantity
  } = props;
  return (
    <div className={styles.ProductRow}>
      <div className={styles.threeProducts}>
        {threeProducts.map((product, index) => (
          <Link key={index} to={`/product/${product.id}`} className={styles.link}>
              <div className={styles.productCard}>
              <ProductCard
                product={product}
                cart={cart}
                setCart={setCart}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                quantity={quantity}
                setQuantity={setQuantity}
                key={product.id}
              />
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductRow;
