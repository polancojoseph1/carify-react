import { useState, useEffect } from 'react';
import styles from './styles/CartProductCard.module.css'
import {
  getCartProductsByCartId,
  updateCartProductChange,
  deleteCartProduct
} from '../apiAccessor';
import { api } from '../axiosConfig';
import { Link } from 'react-router-dom';

function CartProductCard(props) {
  const {
    cart,
    setCart,
    cartProduct,
    cartProducts,
    setCartProducts,
    totalQuantity,
    setTotalQuantity,
    totalPrice,
    setTotalPrice
  } = props;
  const {
    id: cartProductId,
    description,
    brand,
    category,
    price,
    imageurl,
    totalrating,
    quantity: originalQuantity,
    totalquantity
  } = cartProduct;
  const [backupQuantity, setBackupQuantity] = useState(originalQuantity || 0)
  const [cpQuantityState, setCpQuantityState] = useState(originalQuantity || 0)

  const getTotalPrice = async (cartId, api) => {
    const selectedCartProducts = await getCartProductsByCartId(cartId, api);
    return (selectedCartProducts || []).reduce((total, selectedCartProduct) => {
      return total + (selectedCartProduct.price * selectedCartProduct.quantity);
    }, 0)
  }

  useEffect(() => {
    async function renderCartProductCard() {
      const newTotalPrice = await getTotalPrice(cart['id'], api);
      setTotalPrice(newTotalPrice)
      setCpQuantityState(originalQuantity)
    }
    renderCartProductCard()
  }, [cartProduct]);

  const handleQuantityChange = async (event) => {
    const {value : unparsedNewCpQuantity} = event.target
    if (unparsedNewCpQuantity === '') {
      setBackupQuantity(cpQuantityState)
      setCpQuantityState('');
    } else {
      let newCpQuantity = parseInt(unparsedNewCpQuantity, 10)
      if (newCpQuantity <= 0) {
        newCpQuantity = 1;
      } else if (newCpQuantity > totalquantity) {
        newCpQuantity = totalquantity
      }
      setCpQuantityState(newCpQuantity);
      await updateCartProductChange(
        cartProductId, 
        newCpQuantity, 
        newCpQuantity * price,
        api
      )
      const newTotalPrice = await getTotalPrice(cart['id'], api);
      setTotalPrice(newTotalPrice)
      setTotalQuantity(totalQuantity - (cpQuantityState || 1) + newCpQuantity)
    }
  }

  const handleBlur = async (event) => {
    if (cpQuantityState === '') {
      setCpQuantityState(backupQuantity);
      await updateCartProductChange(
        cartProductId,
        cpQuantityState,
        cpQuantityState * price
      );
      const newTotalPrice = await getTotalPrice(cart['id'], api);
      setTotalPrice(newTotalPrice)
    }
  };

  const handleWheel = (event) => {
    // This get the number to stop changing on wheel
    event.target.blur()
  }

  const handleDelete = async () => {
    const deletedCartProduct = await deleteCartProduct(
      cart['id'],
      cartProduct['product_id'],
      api
    )
    if (deletedCartProduct) {
      const selectedCartProducts = await getCartProductsByCartId(
        cart['id'],
        api
      )
      setCartProducts(
        selectedCartProducts
      )
      const newTotalPrice = await getTotalPrice(cart['id'], api);
      setTotalPrice(newTotalPrice)
    }
    setCpQuantityState(originalQuantity)
  }
  
  return (
    <div className={styles.CartProductCard}>
      <div className={styles.details}>
        <div className={styles.imageSection}>
          <Link className={styles.link} to={`/product/${cartProduct['product_id']}`}>
            <img src={require(`../icon/cars/${imageurl || '0.png'}`)} className={styles.image} />
          </Link>
        </div>
        <div className={styles.info}>
          <div className={styles.descriptionAndPrice}>
            <div className={styles.carInfo}>
              <div className={styles.cardTitle}>
                {brand} {category}
              </div>
              <div className={styles.description}> {description} </div>
            </div>
            <div className={styles.price}> ${ price * cpQuantityState }</div>
          </div>
          <div className={styles.totalrating}>Rating: {totalrating}</div>
          <div className={styles.updateAndDeleteCartProducts}>
            <div className={styles.updateCpQuantity}>
              <div className={styles.numberOfItems}>
                Number of items:
              </div>
              <input
                type='number' 
                className={styles.quantityInput} 
                value={cpQuantityState} 
                min="1"
                onChange={handleQuantityChange}
                onBlur={handleBlur}
                onWheel={handleWheel}
              />
            </div>
            <div className={styles.deleteAllItems}>
              <div className={styles.deleteText} onClick={handleDelete}>
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
