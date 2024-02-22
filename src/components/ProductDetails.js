import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {api} from '../axiosConfig';
import './styles/ProductDetails.css'
import AddToCart from './AddToCart';
import { getProductById } from '../apiAccessor'

function ProductDetails(props) {
  const [product, setProduct] = useState({});
  const {cart, setCart} = props
  const { id } = useParams()

  useEffect(() => {
    getProductById(id, setProduct, api);
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
    quantity,
    totalrating
  } = product
  return (
    <div className="ProductDetails">
      <div className='details-container'>
      <div className='image-section'>
          <img src={imageurl} className="image" />
        </div>
        <div className='info'>
          <p className='description'>Description: { description }</p>
          <div className='brand'>Brand: { brand }</div>
          <div className='category'>Category: { category }</div>
          <div className='price'>Price: { price }</div>
          <div className='totalRating'>Rating: { totalrating }</div>
          <div className='color'>Color: { color }</div>
          <div className='condition'>Condition: { condition }</div>
          <div className='model'>Model: { model }</div>
          <div className='quantity'>Quantity: {quantity}</div>
          <div className='add-to-cart'>
            <AddToCart
              product={product}
              cart={cart}
              setCart={setCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
