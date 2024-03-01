import React, { useState } from 'react';
import styles from './styles/LoginForm.module.css'

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const {setSignupSelected} = props;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., send username and password to server)
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember me:', rememberMe);
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
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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