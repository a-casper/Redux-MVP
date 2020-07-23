import React from 'react';
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
        <h3>Or Create a New Team:</h3>
        <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label>Team Name::</label>
          <Field
          name='name'
          component='input'
          type='text'
          />
        </div>
        <div className={styles.formField}>
          <label>Selected Charity:</label>
          <Field
          name='charity'
          component='input'
          type='text'
          />
        </div>
        <div className={styles.formField}>
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
    )
  }
  //last case, render team view Page
  return (
    <div>
      <h1>{team.name}</h1>
      <h2>{team.charity}</h2>
      <h2>{team.goal}</h2>
      <h3>{team.totalMiles}</h3>
      <h3>{team.formattedTime}</h3>
      <h3>{team.pace}</h3>
      {teammates.map((member) => {
        return (
          <div key={member.id} className={styles.itemRunner}>
          <div className={styles.itemRunnerInfo}>
            <img className={styles.itemRunningIcon} src="./missing.jpg" alt="icon goes here"></img>
            <div className={styles.itemRunnerName}>
              <h5>{member.name}</h5>
              <h6>{member.birthDate}</h6>
            </div>
            <div>
              <p>Pledge: ${member.pledge}</p>
            </div>
          </div>
          <div className={styles.itemGoalTracker}>
            {/* {member.goal === 0 ? <button>Set a goal to track monthly progress!</button> : <span>{`${miles} out of ${member.goal}`}</span>} */}
          </div>
          <div className={styles.itemRunnerStats}>
            <div>
              <span>{`Miles: ${member.totalMiles}`}</span>
            </div>
            <div>
              <span>{`Time: ${member.formattedTime}`}</span>
            </div>
            <div>
              <span>{`Pace: ${member.pace} MPH`}</span>
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