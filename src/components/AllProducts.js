import React, { useState, useEffect } from 'react';
import {api, auth} from '../axiosConfig';
import styles from './styles/AllProducts.module.css';
// import ProductRow from './ProductRow';
import { getAllProducts, createGuest, getUserIdByStorage, setUserIdByStorage } from '../apiAccessor'
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

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
      <div className={styles.productCards}>
        {products.map((product, index) => (
          <Link className={styles.link} to={`/product/${product['id']}`}>
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
