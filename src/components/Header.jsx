import React from 'react';
import styles from '../styles/header.css';

export default function Header(props) {
  return (
    <header className={styles.containerHeader}>
      <h1 className={styles.itemTitle}>Relay For..?</h1>
      <button className={styles.itemLogin}>Log New Run</button>
      <table className={styles.itemNav}>
        <tbody>
          <tr>
            <td>
              <button value='runner'>Individual Results</button>
            </td>
            <td>
              <button value='team'>Team Results</button>
            </td>
            <td>
              <button value='runs'>Individual Run History</button>
            </td>
          </tr>
        </tbody>
      </table>
    </header>
  );
};

// export default Header;