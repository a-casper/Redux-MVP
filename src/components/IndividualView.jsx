import React from 'react';
import styles from '../styles/individualView.css'

const IndividualView = ( { view, user } ) => {
  //If no user (not logged in) or not on runner page, display nothing
  if(view !== 'runner' || user === null) {
    return null;
  }

  //setup chartiy variable based on whether or not the user is on a team or not
  let charity = <button>Sign up For a Team to run for Charity!</button>
  if(user.teamId !== null) {
    charity =
      <div>
        <h6>{team.charity}</h6>
        <p>{user.pledge}</p>
      </div>;
  }

  return (
    <div className={styles.itemRunner}>
      <div className={styles.itemRunnerInfo}>
        <img className={styles.itemRunningIcon} src="./missing.jpg" alt="icon goes here"></img>
        <div className={styles.itemRunnerName}>
          <h5>{user.name}</h5>
          <h6>{user.teamName}</h6>
          <button>Log New Run</button>
        </div>
        <div>
          {charity}
        </div>
      </div>
      <div className={styles.itemGoalTracker}>
        {user.goal === 0 ? <button>Set a goal to track monthly progress!</button> : <span>{`${miles} out of ${user.goal}`}</span>}
      </div>
      <div className={styles.itemRunnerStats}>
        <div>
          <span>{`DISTANCE PLACEHODER`}</span>
        </div>
        <div>
          <span>{`TIME PLACEHOLDER`}</span>
        </div>
        <div>
          <span>{`PACE PLACEHOLDER`}</span>
        </div>
      </div>
    </div>
  )

};

export default IndividualView;