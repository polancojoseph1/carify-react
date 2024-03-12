import React, { useState } from 'react';
import styles from './styles/LoginForm.module.css'
import { api, auth } from '../axiosConfig';
import {
  getUserIdByStorage,
  login,
  setUserIdByStorage,
  updateCartUserId
} from '../apiAccessor';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState(localStorage.getItem('password') || '');
  const [rememberMe, setRememberMe] = useState(localStorage.getItem('rememberMe') === 'true' || false);
  const {
    setSignupSelected,
    cartId,
    setCart
  } = props;
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password, auth)
    setUserIdByStorage(user['id'])
    if (rememberMe) {
      localStorage.setItem('email', email)
      localStorage.setItem('password', password)
      localStorage.setItem('rememberMe', true)
    } else {
      localStorage.removeItem('email')
      localStorage.removeItem('password')
      localStorage.removeItem('rememberMe')
    }
    if (cartId) {
      console.log(cartId, "cartId")
      const updatedCart = await updateCartUserId(cartId, user['id'], api)
      setCart(updatedCart)
    }
    navigate('/')
  };

  const handleRegister = () => {
    setSignupSelected(true)
  }

  return (
    <div className={styles.LoginForm}>
      <div className={styles.formTitle}>Login</div>
      <form className={styles.innerForm} onSubmit={handleSubmit}>
        <input
          className={styles.formInput}
          type="text"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          className={styles.formInput}
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label className={styles.rememberMeSection}>
          <input
            className={styles.rememberMeCheckbox}
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          &nbsp;
          <div className={styles.rememberMeText}>
          Remember me
          </div>
        </label>
        <br />
        <button
          className={styles.formButton}
          type="submit">
          LOG IN
        </button>
        <div className={styles.switchForm}>
          Don't have an account?
          &nbsp;
          <div
            className={styles.registerLink}
            onClick={handleRegister}
          >
            Register
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;