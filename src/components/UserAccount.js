import React, { useState, useEffect } from 'react';
import styles from './styles/UserAccount.module.css';
import { api, auth } from '../axiosConfig';
import { editUser, getUserById, getUserIdByStorage, logout, removeUserIdFromStorage } from '../apiAccessor';
import { Link, useNavigate } from 'react-router-dom';

function UserAccount(props) {
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const { cartId } = props;
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchUser() {
      const userId = getUserIdByStorage();
      const selectedUser = await getUserById(userId, api);
      console.log(selectedUser, "selected user");
      const fullName = selectedUser.name
        ?
          selectedUser.name.split(' ')
        :
          [];
      setFormData({
        id: userId,
        firstName: fullName[0] || '',
        lastName: fullName[1] || '',
        email: selectedUser.email
      });
    }
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editUser(
      formData.id,
      formData.firstName + ' ' + formData.lastName,
      formData.email,
      api
    );
    setEditing(false);
  };

  const handleLogout = async () => {
    await logout(auth);
    removeUserIdFromStorage();
    navigate('/product');
  };

  return (
    <div className={styles.UserAccount}>
      <div className={styles.title}>
        {editing ?
          'Edit' :
          'View'
        } Account
      </div>
      <div className={styles.userAccountInfo}>
        {editing ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.infoInputRow}>
              <div className={styles.infoLabel}>
                First Name:&nbsp;
              </div>
              <input
                type="text"
                className={styles.infoInput}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                />
            </div>
            <div className={styles.infoInputRow}>
            <div className={styles.infoLabel}>
              Last Name:&nbsp;
            </div>
            <input type="text"
              className={styles.infoInput}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              />
            </div>
            <div className={styles.infoInputRow}>
              <div className={styles.infoLabel}>
                Email:&nbsp;
              </div>
              <input type="email" className={styles.infoInput} name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className={styles.saveButtonContainer}>
              <button type="submit" className={styles.saveButton}>Save</button>
            </div>
          </form>
        ) : (
            <div className={styles.userInfo}>
              <div className={styles.infoColumns}>
                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>First Name:&nbsp;</div>
                  <div className={styles.infoValue} id={styles.firstName}>
                    <div className={styles.infoText}>
                      {formData.firstName}
                    </div>
                  </div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Last Name:&nbsp;</div>
                  <div className={styles.infoValue} id={styles.lastName}>
                    <div className={styles.infoText}>
                      {formData.lastName}
                    </div>
                  </div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.infoLabel} id={styles.email}>
                    Email:&nbsp;
                  </div>
                  <div className={styles.infoValue}>
                    <div className={styles.infoText}>
                    {formData.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.editButtonContainer}>
                <button className={styles.editButton} onClick={() => setEditing(true)}>Edit</button>
              </div>
            </div>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.viewProducts}>
          <Link className={styles.productsLink} to="/product">Products</Link>
        </div>
        <div className={styles.viewCart}>
          <Link className={styles.cartLink} to={`/cart/${cartId || 0}`}>Cart</Link>
        </div>
        <div className={styles.logoutSection}>
          <div onClick={handleLogout} className={styles.logout}>Logout</div>
          </div>
      </div>
    </div>
  );
}

export default UserAccount;
