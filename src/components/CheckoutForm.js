import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/CheckoutForm.module.css'
import { updateCart } from '../apiAccessor';
import { api } from '../axiosConfig';

function CheckoutForm(props) {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    emailOffers: false,
    firstName: '',
    lastName: '',
    address: '',
    company: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const {
    setCart,
    setCartProducts,
    setQuantity
  } = props

  const location = useLocation()
  let totalPrice;
  let totalQuantity;
  if (location.state) {
    totalPrice = location.state.totalPrice
    totalQuantity = location.state.totalQuantity
  }

  const { cartId } = useParams()
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [updatedCart] = await updateCart(
      cartId,
      'paid',
      null,
      api
    )
    setCart({})
    setCartProducts([])
    setQuantity(0)
    navigate('/success');
  };

  return (
    <form className={styles.CheckoutForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <div className={styles.formGroupLabel}>
          Contact Information
        </div>
        <input className={styles.longInput} type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required />

        <input className={styles.longInput} type="text" name="phoneNumber" placeholder='Phone Number (optional)' value={formData.phoneNumber} onChange={handleChange} />
        <div className={styles.checkboxGroup}>
          <input className={styles.checkboxInput} type="checkbox" id="emailOffers" name="emailOffers" value={formData.emailOffers} onChange={handleChange} />
          <label className={styles.checkboxText} htmlFor="emailOffers">Email me with special deals and offers</label>
        </div>
      </div>

      <div className={styles.formGroup}>
        <div className={styles.formGroupLabel}>
          Shipping Address
        </div>
        <div className={styles.halfInputSection}>
          <input className={styles.halfInput} type="text" name="firstName" placeholder='First Name' value={formData.firstName} onChange={handleChange} required />

          <input className={styles.halfInput} type="text" name="lastName" placeholder='Last Name' value={formData.lastName} onChange={handleChange} required />
        </div>

        <input className={styles.longInput} type="text" name="address" placeholder='Address' value={formData.address} onChange={handleChange} required />
          
        <input className={styles.longInput} type="text" name="company" placeholder='Company (required for business addresses)' value={formData.company} onChange={handleChange} />

        <input className={styles.longInput} type="text" name="apartment" placeholder='Apartment, suite, etc. (optional)' value={formData.apartment} onChange={handleChange} />

        <div className={styles.thirdInputSection}>
          <input className={styles.thirdInput} type="text" name="city" placeholder='City' value={formData.city} onChange={handleChange} required />

          <input className={styles.thirdInput} type="text" name="state" placeholder='State' value={formData.state} onChange={handleChange} required />

          <input className={styles.thirdInput} type="text" name="postalCode" placeholder='Postal Code' value={formData.postalCode} onChange={handleChange} required />
        </div>
        
        <input className={styles.longInput} type="text" name="country" placeholder='Country/Region' value={formData.country} onChange={handleChange} required />
      </div>  

      <div className={styles.formGroup}>
        <div className={styles.formGroupLabel}>
          Payment Details
        </div>
        <input className={styles.longInput} type="text" name="cardNumber" placeholder='Card Number' value={formData.cardNumber} onChange={handleChange} required />
        
        <div className={styles.halfInputSection}>
        <input className={styles.halfInput} type="text" name="expirationDate" placeholder='Expiration Date' value={formData.expirationDate} onChange={handleChange} required />

        <input className={styles.halfInput} type="text" name="cvv" placeholder='CVV' value={formData.cvv} onChange={handleChange} required />
        </div>
      </div>

      <div className={styles.subtotalSection}>
        <div className={styles.subtotalLabel}>
          Subtotal ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}):
        </div>
        <div className={styles.subtotalValue}>
          ${totalPrice}
        </div>
      </div>

      <div className={styles.buttonSection}>
        <button type="submit" className={styles.completeOrder}>Complete Order</button>
      </div>
    </form>
  );
}

export default CheckoutForm;