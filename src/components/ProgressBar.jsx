import React from 'react';
import styles from '../styles/progressBar.css';

const ProgressBar = ({bgcolor, completed}) => {
  return (
    <div className={styles.container}>
      <div className={styles.filler} style={{width: completed + '%'}}>
        <span className={styles.label}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;