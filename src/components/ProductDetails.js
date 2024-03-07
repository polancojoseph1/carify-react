import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {api} from '../axiosConfig';
import styles from './styles/ProductDetails.module.css'
import AddToCart from './AddToCart';
import { getProductById } from '../apiAccessor'
import StarRating from './StarRating';

function ProductDetails(props) {
  const [product, setProduct] = useState({});
  const {
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity: totalQuantity,
    setQuantity
  } = props
  const { id } = useParams()

  useEffect(() => {
    async function renderProduct() {
      const selectedProduct = await getProductById(id, api);
      setProduct(selectedProduct)
    }
    renderProduct()
  }, []);
  const {
    brand,
    category,
    color,
    condition,
    description,
    imageurl,
    model,
    price,
    quantity: productQuantity,
    totalrating
  } = product
  return (
    <div className={styles.ProductDetails}>
      <div className={styles.detailsContainer}>
        <div className={styles.title}>
          <div className={styles.titleText}>
            { brand } { category }
          </div>
        </div>
        <div className={styles.imageSection}>
          <img src={product ? require(`../icon/cars/${imageurl || '0.png'}`) : ''} className={styles.image} />
        </div>
        <div className={styles.info}>
          <p className={styles.description}> { description }</p>
          <div className={styles.priceAndRating}>
            <div className={styles.totalRating}>
              <StarRating rating={totalrating} />
            </div>
            <div className={styles.price}>${ price }</div>
          </div>
          {/* <div className={styles.quantity}>Quantity: {productQuantity}</div> */}
          <div className={
            productQuantity < 10
              ?
              styles.quantitySectionRed
              : styles.quantitySectionGreen
          }>
              <div
                type='number' 
                className={styles.quantityAmount}
              >
                  {productQuantity}&nbsp;
                </div>
                <div className={styles.numberOfItems}>
                    items left in stock.
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

export default ProductDetails;
