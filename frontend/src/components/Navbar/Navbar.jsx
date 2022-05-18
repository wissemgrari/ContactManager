import styles from './Navbar.module.css';
import { FaPlus, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h2>
        <FaUserFriends />
        &nbsp; Contact Manager
      </h2>

      <ul>
        <li className={styles.add}>
          <FaPlus />
          <Link to='/add'>Add Contact</Link>
        </li>
        <Link to='/'>
          <li>Contacts List</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
