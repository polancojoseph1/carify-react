import React, { useState } from 'react';
import styles from './styles/LoginForm.module.css'
import { auth } from '../axiosConfig';
import { login } from '../apiAccessor';

function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const {setSignupSelected} = props;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password, auth)
    console.log(user)
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