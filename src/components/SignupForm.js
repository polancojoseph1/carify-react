import React, { useState } from 'react';
import styles from './styles/SignupForm.module.css'
import { api, auth } from '../axiosConfig';
import {
  signup,
  setUserIdByStorage,
  updateCartUserId
} from '../apiAccessor';
import { useNavigate } from 'react-router-dom';

function SignupForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const {
    setSignupSelected,
    cartId,
    setCart
  } = props;
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signup(
      `${firstName} ${lastName}`,
      email,
      password,
      auth
    )
    setUserIdByStorage(user['id'])
    if (cartId) {
      const updatedCart = await updateCartUserId(cartId, user['id'], api)
      setCart(updatedCart)
    }
    navigate('/')
  };

  const handleRegister = () => {
    setSignupSelected(false)
  }

  return (
    <div className={styles.SignupForm}>
      <div className={styles.formTitle}>Signup</div>
      <form className={styles.innerForm} onSubmit={handleSubmit}>
        <input
        className={styles.formInput}
        type="text"
        placeholder='First Name'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        />
        <input
          className={styles.formInput}
          type="text"
          placeholder='Last Name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          className={styles.formInput}
          type="text"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.formInput}
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
        className={styles.formInput}
        type="password"
        placeholder='Confirm Password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        />
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
        <button
          className={styles.formButton}
          type="submit">
          SIGN UP
        </button>
        <div className={styles.switchForm}>
          Already a member?
          &nbsp;
          <div
            className={styles.registerLink}
            onClick={handleRegister}
          >
            Login
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;