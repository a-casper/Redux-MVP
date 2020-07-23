import React from 'react';
import ProgressBar from './ProgressBar';
// import LinearProgressWithLabel from '@material-ui/core/LinearProgress'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createTeam } from '../actions/databaseActions';
import styles from '../styles/teamView.css';

let TeamView = ( { view, user, team, handleSubmit, teammates, teams } ) => {
  //if not logged in or not on team page, display nothing
  if(view !== 'team' || user === null) {
    return null;
  //if the user is not on a team, prompt them to create or sign up for a team
  } else if(team === null) {
    return (
      <div>
        <div className={styles.teamForm}>
          <h3 id="join">Join a Team</h3>
          <form onSubmit={handleSubmit}>
          <Field name='id' component='select'>
              <option></option>
              {teams.map(team => {
                return <option key={team.id} value={team.id}>{team.name}</option>
              })}
          </Field>
          <button type="submit">Join Now!</button>
          </form>
        </div>
        <div className={styles.teamForm}>
          <h3>Or Create a New Team:</h3>
          <form className={styles.createForm} onSubmit={handleSubmit}>
          <div className={styles.createField}>
            <label>Team Name:</label>
            <Field
            name='name'
            component='input'
            type='text'
            />
          </div>
          <div className={styles.createField}>
            <label>Selected Charity:</label>
            <Field
            name='charity'
            component='input'
            type='text'
            />
          </div>
          <div className={styles.createField}>
            <label>Monthly Milage Goal:</label>
            <Field
            name='goal'
            component='input'
            type='number'
            />
          </div>
          <button type="submit">Create and Join Team</button>
          </form>
        </div>

      </div>
    )
  }
  //last case, render team view Page
  return (
    <div>
      <div className={styles.teamSummary}>
        <div className={styles.teamHeader}>
          <h1 className={styles.teamName}>{team.name}</h1>
          <h1 className={styles.teamCharity}>{team.charity}</h1>
        </div>
        <div className={styles.teamStats}>
          <h3 className={styles.teamMiles}>Total Miles: {team.totalMiles}</h3>
          <h3 className={styles.teamGoal}>Milage Goal: {team.goal}</h3>
          <h3 className={styles.teamTime}>Total Time: {team.formattedTime}</h3>
          <h3 className={styles.teamPace}>Avg Pace: {team.pace} MPH</h3>
        </div>
        <div>
          {/* <ProgressBar completed={ (team.totalMiles / team.goal) * 100} /> */}
          {/* <LinearProgressWithLabel variant="determinate" value={team.totalMiles / team.goal * 100} /> */}

        </div>
      </div>
      {teammates.map((member) => {
        return (
          <div key={member.id} className={styles.itemRunner}>
          <div className={styles.itemRunnerInfo}>
            <img className={styles.itemRunningIcon} src="https://hrmvp.blob.core.windows.net/mvp/LogoNoWords.webp" alt="icon goes here"></img>
            <div className={styles.itemRunnerName}>
              <h5>{member.name}</h5>
              <h6>AGE: {member.age}</h6>
            </div>
            <div>
              <h6>Pledge: ${member.pledge}</h6>
            </div>
          </div>
          <div className={styles.itemGoalTracker}>
            {/* {member.goal === 0 ? <button>Set a goal to track monthly progress!</button> : <span>{`${miles} out of ${member.goal}`}</span>} */}
          </div>
          <div className={styles.itemRunnerStats}>
            <div>
              <h6>{`Miles: ${member.totalMiles}`}</h6>
            </div>
            <div>
              <h6>{`Time: ${member.formattedTime}`}</h6>
            </div>
            <div>
              <h6>{`Pace: ${member.pace} MPH`}</h6>
            </div>
          </div>
        </div>
        )
      })}
    </div>
  )


};

const dispatch = {
  onSubmit: createTeam
}

const select = state => ({
  teammates: state.databaseReducer.teammates,
  teams: state.databaseReducer.teams
});

TeamView = reduxForm({
  form: "TeamView"
})(TeamView);

export default connect(select, dispatch)(TeamView);