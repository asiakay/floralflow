// Header.js
import React from 'react';
import { useUser } from '../contexts/UserProvider';
import styles from '../styles/Header.module.css';

const Header = () => {
  const { user } = useUser();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>FloralFlow</div>
      <nav>
        <ul className={styles.navLinks}>
          <li className={styles.navLink}>Home</li>
          <li className={styles.navLink}>About</li>
          <li className={styles.navLink}>Contact</li>
        </ul>
      </nav>
      {user ? <button>Logout</button> : <button>Login</button>}
    </header>
  );
};

export default Header;
