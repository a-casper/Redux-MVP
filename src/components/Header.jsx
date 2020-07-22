import React from 'react';
import { connect } from 'react-redux';
import styles from '../styles/header.css';
import { changeDisplay } from '../actions/displayActions';

const Header = ({ changeDisplay }) => {
  return (
    <header className={styles.containerHeader}>
      <h1 className={styles.itemTitle}>Relay For..?</h1>
      <button className={styles.itemLogin}>Log New Run</button>
      <table className={styles.itemNav}>
        <tbody>
          <tr>
            <td>
              <button value='runner' onClick={changeDisplay}>Individual Results</button>
            </td>
            <td>
              <button value='team' onClick={changeDisplay}>Team Results</button>
            </td>
            <td>
              <button value='runs' onClick={changeDisplay}>Individual Run History</button>
            </td>
          </tr>
        </tbody>
      </table>
    </header>
  );
};

const dispatch = {
  changeDisplay
}

export default connect(null, dispatch)(Header);

// export default Header;