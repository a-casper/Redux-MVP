import React from 'react';
import styles from '../styles/runView.css';

const RunView = ( { view, user, runs } ) => {
  //if not logged in or not on run page, display nothing
  if(view !== 'runs' || user === null) {
    return null;
  }

  let runGrids = runs.map((run, index) => {
    return (
      <div key={index} className={styles.itemRun}>
        <div className={styles.itemRunSummary}>
          <p>Date Logged: {new Date(run.runDate).toLocaleString()}</p>
        </div>
        <div className={styles.itemRunStats}>
          <div className={styles.itemRunMiles}>
            <span>{`Distance in Miles: ${run.miles}`}</span>
          </div>
          <div className={styles.itemRunTime}>
            <span>{`Total Time: ${run.formatted}`}</span>
          </div>
          <div>
            <span>{`Overall Pace: ${run.pace} MPH`}</span>
          </div>
        </div>
      </div>
    );
  });

  return(
    <>
      <h2>{user.name} Run History</h2>
      {runGrids}
    </>
  )

};

export default RunView;