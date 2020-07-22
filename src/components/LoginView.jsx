import React from 'react';
import styles from '../styles/loginView.css';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { toggleSignup } from '../actions/displayActions';
import { submitLogin } from '../actions/databaseActions';
// import Login from './LoginForms/Login.jsx';

let LoginView = ({ handleSubmit, isLoggedIn, newUser, toggleSignup }) => {

  /*///////////////////////////
  Login Form
  ///////////////////////////*/
  if(!isLoggedIn && !newUser) {
    return (
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.formDiv}>
          <label>Username: </label>
          <Field
          name='username'
          component='input'
          type='text'
          />
        </div>
        <div className={styles.formDiv}>
          <label>Password: </label>
          <Field
          name='password'
          component='input'
          type='password'
          />
        </div>
        <button type='submit'>Login</button>
        <span>New User? <a onClick={toggleSignup}>Sign Up Here!</a></span>
      </form>
    )
  /*///////////////////////////
  Sign-Up Form
  ///////////////////////////*/
  } else if (!isLoggedIn && newUser) {
    return (
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.formDiv}>
          <label>Username: </label>
          <Field
          name='username'
          component='input'
          type='text'
          />
        </div>
        <div className={styles.formDiv}>
          <label>Password: </label>
          <Field
          name='password'
          component='input'
          type='password'
          />
        </div>
        <div className={styles.formDiv}>
          <label>Full Name: </label>
          <Field
          name='name'
          component='input'
          type='text'
          />
        </div>
        <div className={styles.formDiv}>
          <label>Birth Date: </label>
          <Field
          name='birthDate'
          component='input'
          type='date'
          />
        </div>
        <button type='submit'>SignUp!</button>
        <span>Already a Member? <a onClick={toggleSignup}>Log in Here!</a></span>
      </form>
    )
  /*///////////////////////////
  Hide-Display
  ///////////////////////////*/
  } else {
    return null;
  }
};

const dispatch = {
  onSubmit: submitLogin,
  toggleSignup
};

const select = state => ({
  isLoggedIn: state.databaseReducer.user !== null,
  newUser: state.displayReducer.newUser
});

LoginView = reduxForm({
  form: "LoginView"
})(LoginView);

export default connect(select, dispatch)(LoginView);