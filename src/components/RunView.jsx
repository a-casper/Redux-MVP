import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteRun } from '../actions/databaseActions';
import styles from '../styles/runView.css';

const RunView = ( { view, user, runs, deleteRun } ) => {
  //if not logged in or not on run page, display nothing
  if(view !== 'runs' || user === null) {
    return null;
  }

  let runGrids = runs.map((run, index) => {
    return (
      <div key={index} className={styles.itemRun}>
        <div className={styles.itemRunSummary}>
          <p>Date Logged: {moment(run.runDate).format("dddd, MMMM Do YYYY, h:mm a")}</p>
          <button className={styles.deleteBtn} value={run.id} onClick={deleteRun}>X</button>
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
      <h2 className={styles.runTitle}>{user.name} Run History</h2>
      {runGrids}
    </>
  )

};

const dispatch = {
  deleteRun
}

export default connect(null, dispatch)(RunView);