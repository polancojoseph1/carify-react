import styles from './styles/UserIcon.module.css'
import userIcon from '../icon/user.png'
import { Link } from 'react-router-dom';
import { getUserIdByStorage } from '../apiAccessor';

function UserIcon() {
  const userId = getUserIdByStorage()
  return (
    <div className={styles.UserIcon}>
      <Link
        to={`/user/${userId}`}
        className={styles.link}
        title='View Account'>
        <img src={userIcon}
          alt='Car Icon'
          className={styles.icon}
        />
      </Link>
    </div>
  );
}

export default UserIcon;