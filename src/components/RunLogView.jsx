import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitRun } from '../actions/databaseActions';
import { toggleLogger } from '../actions/displayActions';
import styles from '../styles/runLogger.css';

let RunLogger = ( { displayLogger, handleSubmit, toggleLogger, user } ) => {
  //display nothing if display logger hasn't been clicked
  if(!displayLogger) {
    return null;
  }

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popup}>
      </div>
      <form className={styles.form} onSubmit={() => {toggleLogger();handleSubmit();}}>
        <div className={styles.formField}>
          <label>Distance (miles):</label>
          <Field
          name='miles'
          component='input'
          type='number'
          />
        </div>
        <div className={styles.formField}>
          <label>Hours:</label>
          <Field
          className={styles.without}
          name='hr'
          component='input'
          type='number'
          />
          <br></br>
          <label>Minutes:</label>
          <Field
          className={styles.without}
          name='min'
          component='input'
          type='number'
          />
          <br></br>
          <label>Seconds:</label>
          <Field
          className={styles.without}
          name='sec'
          component='input'
          type='number'
          />
        </div>
        <div className={styles.formField}>
          <label>Date:</label>
          <Field
          name='date'
          component='input'
          type='datetime-local'
          />
        </div>
        <button type="submit">Log Run</button>
        <a onClick={toggleLogger}>Cancel</a>
      </form>
    </div>
  );
};

const dispatch = {
  onSubmit: submitRun,
  toggleLogger
}

const select = state => ({
  displayLogger: state.displayReducer.displayLogger
});

RunLogger = reduxForm({
  form: "RunLogger"
})(RunLogger);

export default connect(select, dispatch)(RunLogger);