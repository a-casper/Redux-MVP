import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitGoal } from '../actions/databaseActions';
import { toggleGoalLog } from '../actions/displayActions';
import styles from '../styles/runLogger.css';

let GoalLogger = ( { displayGoalLog, handleSubmit, toggleGoalLog } ) => {
  //display nothing if display logger hasn't been clicked
  if(!displayGoalLog) {
    return <button onClick={toggleGoalLog}>Set a personal goal to track your progress!</button>;
  }

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popup}>
      </div>
      <form className={styles.form} onSubmit={() => {toggleGoalLog();handleSubmit();}}>
        <div className={styles.formField}>
          <label>Goal (miles):</label>
          <Field
          name='miles'
          component='input'
          type='number'
          />
        </div>
        <button type="submit">Set Goal</button>
        <a onClick={toggleGoalLog}>Cancel</a>
      </form>
    </div>
  );
};

const dispatch = {
  onSubmit: submitGoal,
  toggleGoalLog
}

const select = state => ({
  displayGoalLog: state.displayReducer.displayGoalLog
});

GoalLogger = reduxForm({
  form: "GoalLogger"
})(GoalLogger);

export default connect(select, dispatch)(GoalLogger);