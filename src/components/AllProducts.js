import React, { useState, useEffect } from 'react';
import {api, auth} from '../axiosConfig';
import styles from './styles/AllProducts.module.css';
import ProductRow from './ProductRow';
import { getAllProducts, createGuest, getUserIdByStorage, setUserIdByStorage } from '../apiAccessor'

function AllProducts(props) {
  const {
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity,
    setQuantity
  } = props;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function renderAllProducts() {
      const allProducts = await getAllProducts(api);
      setProducts(allProducts)
      let userId = getUserIdByStorage()
      if (!userId) {
        createGuest(auth, setUserIdByStorage);
      }
    }
    renderAllProducts()
  }, []);

  return (
    <div className={styles.AllProducts}>
      {products.map((threeProducts, index) => (
        <div className={styles.productRow} key={index}>
          <ProductRow
            key={index}
            threeProducts={threeProducts}
            cart={cart}
            setCart={setCart}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
