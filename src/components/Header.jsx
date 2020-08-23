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
      <img className={styles.logo} src={'https://hrmvp.blob.core.windows.net/mvp/LogoNoWords.webp'}/>
      <div className={styles.itemTitle}>
        <h1>RELAY FOR..?</h1>
        <h2 className={styles.itemSlogan}><span>RUNNING</span> FOR WHAT MATTERS TO YOU</h2>
      </div>
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