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
      <div className={
          styles.threeProducts
      }>
        {threeProducts.map((product, index) => (
        <div>
          { product ?
              (<Link
                key={index}
                to={`/product/${product.id}`}
                className={styles.link}
                title={`View ${product.brand}`}
              >
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
          </Link>)
          : (<div className={styles.productCardEmpty}>
              hello world
            </div>)
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductRow;
