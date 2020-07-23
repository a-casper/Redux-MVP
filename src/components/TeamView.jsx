import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createTeam } from '../actions/databaseActions';
import styles from '../styles/teamView.css';

let TeamView = ( { view, user, team, handleSubmit } ) => {
  //if not logged in or not on team page, display nothing
  if(view !== 'team' || user === null) {
    return null;
  //if the user is not on a team, prompt them to create or sign up for a team
  } else if(team === null) {
    return (
      <div>
        <h3>Create a Team</h3>
        <h2>Want to join an existing team? <a href="#join">Click Here!</a></h2>
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
        <h3 id="join">Join a Team</h3>
        <p>List of Teams goes here</p>
      </div>
    )
  }
  return (
    <h1>display team members placeholder</h1>
  )


};

const dispatch = {
  onSubmit: createTeam
}

const select = state => ({
});

TeamView = reduxForm({
  form: "TeamView"
})(TeamView);

export default connect(select, dispatch)(TeamView);