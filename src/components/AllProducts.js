import React, { useState, useEffect } from 'react';
import {api, auth} from '../axiosConfig';
import styles from './styles/AllProducts.module.css';
import { getAllProducts, createGuest, getUserIdByStorage, setUserIdByStorage } from '../apiAccessor'
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import Filter from './Filter';

function AllProducts(props) {
  const {
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity,
    setQuantity,
    products,
    setProducts
  } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  useEffect(() => {
    async function renderAllProducts() {
      const allProducts = await getAllProducts(api);
      setProducts(allProducts)
      let userId = getUserIdByStorage()
      if (!userId || userId === 'undefined') {
        createGuest(auth, setUserIdByStorage);
      }
    }
    renderAllProducts()
  }, [setProducts]);

  return (
    <div className={styles.AllProducts}>
      <div className={styles.filter}>
        <Filter
          products={products}
          setProducts={setProducts}
        />
      </div>
      <div className={styles.productCards}>
        {(loading ? [] : (products || [])).map((product, index) => (
          <Link className={styles.link} to={`/product/${product['id']}`} title={`View ${product.brand}`} key={index}>
            <div className={styles.productCard} key={index}>
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
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
