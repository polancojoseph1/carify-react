import React, { useState } from 'react';
import styles from './styles/SignupForm.module.css'

function SignupForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
    console.log('changing set signup')
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
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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