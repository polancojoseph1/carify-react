import styles from './styles/UserPage.module.css'
import {
  getUserIdByStorage,
  getUserById
} from '../apiAccessor';
import { useEffect, useState } from 'react';
import { api } from '../axiosConfig';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function UserPage() {
  const [isGuest, setIsGuest] = useState(true);
  const [signupSelected, setSignupSelected] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      const userId = getUserIdByStorage()
      const user = await getUserById(userId, api)
      if (!user || user.guest) {
        setIsGuest(true)
      } else {
        setIsGuest(false)
      }
    }
    fetchUser()
  }, [setSignupSelected])
  return (
    <div className={styles.UserPage}>
      <div className={
        isGuest ?
          !signupSelected ?
            styles.loginSection
            :
            styles.signupSection
          :
        styles.userSection
      }>
        {isGuest ?
          !signupSelected ?
          (<div className={styles.loginFormContainer}>
            <LoginForm
              setSignupSelected={setSignupSelected}
            />
          </div>)
            :
            (<div className={styles.signupFormContainer}>
              <SignupForm
                setSignupSelected={setSignupSelected}
              />
            </div>)
          :
          (<div></div>)
        }
      </div>
    </div>
  );
}

export default UserPage;