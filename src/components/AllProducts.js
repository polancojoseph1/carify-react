import React, { useState, useEffect } from 'react';
import {api, auth} from '../axiosConfig';
import './styles/AllProducts.css';
import ProductRow from './ProductRow';
import { getAllProducts, createGuest, getUserIdByStorage, setUserIdByStorage } from '../apiAccessor'

function AllProducts(props) {
  const { cart, setCart } = props;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts(api, setProducts);
    let userId = getUserIdByStorage()
    if (!userId) {
      createGuest(auth, setUserIdByStorage);
    }
  }, []);

  return (
    <div className="AllProducts">
      {products.map(threeProducts => (
        <div className='product-row' key={threeProducts.id}>
          <ProductRow
            threeProducts={threeProducts}
            cart={cart}
            setCart={setCart}
          />
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
