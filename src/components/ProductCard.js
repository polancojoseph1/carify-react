import styles from './styles/ProductCard.module.css'
import AddToCart from './AddToCart';

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
    totalrating
  } = product;
  return (
    <div className={styles.ProductCard}>
      <div className={styles.details}>
        <div className={styles.imageSection}>
          <img src={require(`../icon/cars/${imageurl || '0.png'}`)} className={styles.image} />
        </div>
        <div className={styles.info}>
          <div className={styles.brand}>Brand: { brand }</div>
          <div className={styles.category}>Category: { category }</div>
          <div className={styles.price}>Price: { price }</div>
          <div className={styles.totalrating}>Rating: {totalrating}</div>
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
