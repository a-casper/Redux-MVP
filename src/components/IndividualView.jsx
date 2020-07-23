import React from 'react';
import { connect } from 'react-redux';
import { changeDisplay } from '../actions/displayActions';
import styles from '../styles/individualView.css'

const IndividualView = ( { view, user, changeDisplay, team } ) => {
  //If no user (not logged in) or not on runner page, display nothing
  if(view !== 'runner' || user === null) {
    return null;
  }

  //setup chartiy variable based on whether or not the user is on a team or not
  let charity = <button value='team' onClick={changeDisplay}>Sign up For a Team to run for Charity!</button>;
  if(team !== null) {
    charity =
      <div className={styles.charity}>
        <h6>{team.charity}</h6>
        <h6>Pledge: ${user.pledge}</h6>
      </div>;
  }

  return (
    <div className={styles.itemRunner}>
      <div className={styles.itemRunnerInfo}>
        <img className={styles.itemRunningIcon} src="https://hrmvp.blob.core.windows.net/mvp/LogoNoWords.webp" alt="Relay For...? Icon"></img>
        <div className={styles.itemRunnerName}>
          <h5>{user.name}</h5>
          <h6>AGE: {user.age}</h6>
        </div>
        <div>
          {charity}
        </div>
      </div>
      <div className={styles.itemGoalTracker}>
        {/* {user.goal === 0 ? <button>Set a goal to track monthly progress!</button> : <span>{`${miles} out of ${user.goal}`}</span>} */}
      </div>
      <div className={styles.itemRunnerStats}>
        <div>
          <h6>{`Miles: ${user.totalMiles}`}</h6>
        </div>
        <div>
          <h6>{`Time: ${user.formattedTime}`}</h6>
        </div>
        <div>
          <h6>{`Pace: ${user.pace} MPH`}</h6>
        </div>
      </div>
    </div>
  )

};

const dispatch = {
  changeDisplay
}

export default connect(null, dispatch)(IndividualView);