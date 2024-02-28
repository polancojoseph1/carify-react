import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {api} from '../axiosConfig';
import styles from './styles/ProductDetails.module.css'
import AddToCart from './AddToCart';
import { getProductById } from '../apiAccessor'

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
      <div className={styles.imageSection}>
          <img src={imageurl} className={styles.image} />
        </div>
        <div className={styles.info}>
          <p className={styles.description}>Description: { description }</p>
          <div className={styles.brand}>Brand: { brand }</div>
          <div className={styles.category}>Category: { category }</div>
          <div className={styles.price}>Price: { price }</div>
          <div className={styles.totalRating}>Rating: { totalrating }</div>
          <div className={styles.color}>Color: { color }</div>
          <div className={styles.condition}>Condition: { condition }</div>
          <div className={styles.model}>Model: { model }</div>
          <div className={styles.quantity}>Quantity: {productQuantity}</div>
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
