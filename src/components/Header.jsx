import React from 'react';
import { connect } from 'react-redux';
import styles from '../styles/header.css';
import { changeDisplay, toggleLogger } from '../actions/displayActions';

const Header = ({ changeDisplay, user, toggleLogger }) => {

  const isLoggedIn = user !== null;
  let logRunButton = <button className={styles.itemLogin} onClick={toggleLogger}>Log New Run</button>
  if (!isLoggedIn) {
    logRunButton = <button className={styles.itemLogin} disabled>Log New Run</button>
  }

  return (
    <header className={styles.containerHeader}>
      <h1 className={styles.itemTitle}>Relay For..?</h1>
      {logRunButton}
      <table className={styles.itemNav}>
        <tbody>
          <tr>
            <td>
              <button value='runner' onClick={(e) => {if(isLoggedIn) {changeDisplay(e)}}}>Individual Results</button>
            </td>
            <td>
              <button value='team' onClick={(e) => {if(isLoggedIn) {changeDisplay(e)}}}>Team Results</button>
            </td>
            <td>
              <button value='runs' onClick={(e) => {if(isLoggedIn) {changeDisplay(e)}}}>Individual Run History</button>
            </td>
          </tr>
        </tbody>
      </table>
    </header>
  );
};

const dispatch = {
  changeDisplay,
  toggleLogger
}

export default connect(null, dispatch)(Header);

// export default Header;