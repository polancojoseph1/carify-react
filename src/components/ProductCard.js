import styles from './styles/ProductCard.module.css'
import AddToCart from './AddToCart';
import StarRating from './StarRating';
import { Link } from 'react-router-dom';

function ProductCard(props) {
  const {
    product,
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity: totalQuantity,
    setQuantity
  } = props;
  const {
    brand,
    category,
    price,
    imageurl,
    totalrating,
    description
  } = product;
  return (
    <div className={styles.ProductCard}>
      <div className={styles.details}>
        <Link className={styles.link} to={`/product/${product['id']}`} title={`View ${product.brand}`}>
          <div className={styles.imageSection}>
            <img src={require(`../icon/cars/${imageurl || '0.png'}`)} className={styles.image} />
          </div>
        </Link>
        <div className={styles.info}>
          <div className={styles.infoTop}>
            <div className={styles.carName}>
              <div className={styles.brand}>{
                brand === 'Mercedes-Benz'? 'Mercedes' : brand
              }&nbsp;</div>
              <div className={styles.category}>{
                category === 'Sports Car'? 'Camaro' : category
              }</div>
            </div>
            <div className={styles.priceSection}>
              <div className={styles.price}>${price}</div>
            </div>
          </div>
          <div className={styles.infoBottom}>
            <div className={styles.description}>{
              description ?
                description.length > 90 ? description.substring(0, 90).trim() + '...' : description
                : ''
            }</div>
            <div className={styles.starRating}>
              <StarRating rating={totalrating} />
            </div>
          </div>
          <div className={styles.addToCart}>
            <AddToCart
              product={product}
              cart={cart}
              setCart={setCart}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              quantity={totalQuantity}
              setQuantity={setQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
