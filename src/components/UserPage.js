import styles from './styles/UserPage.module.css'
import {
  getUserIdByStorage,
  getUserById
} from '../apiAccessor';
import { useEffect, useState } from 'react';
import { api } from '../axiosConfig';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import UserAccount from './UserAccount';
import Top3Products from './Top3Products';

function UserPage(props) {
  const [isGuest, setIsGuest] = useState(true);
  const [signupSelected, setSignupSelected] = useState(false);
  const {
    cart,
    setCart,
    cartProducts,
    setCartProducts,
    quantity,
    setQuantity
  } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const userId = getUserIdByStorage()
      let user;
      if (userId && userId !== 'undefined') {
        user = await getUserById(userId, api)
      }
      if (!user || user.guest) {
        setIsGuest(true)
      } else {
        setIsGuest(false)
      }
    }
    fetchUser()
  }, [setSignupSelected])
  return loading ? (<div></div>) : (
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
              cartId={cart ? cart.id : null}
              setCart={setCart}
            />
          </div>)
            :
            (<div className={styles.signupFormContainer}>
              <SignupForm
                setSignupSelected={setSignupSelected}
                cartId={cart ? cart.id : null}
                setCart={setCart}
              />
            </div>)
          :
          (<div className={styles.userAccountContainer}>
            <UserAccount
              cartId={cart ? cart.id : null}
              setCart={setCart}
            />
          </div>)
        }
      </div>
      <div className={styles.top3Products}>
        <Top3Products
          cart={cart}
          setCart={setCart}
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
    </div>
  );
}

export default UserPage;