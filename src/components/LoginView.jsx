import React from 'react';
import styles from '../styles/loginView.css';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { toggleSignup } from '../actions/displayActions';
import { submitLogin } from '../actions/databaseActions';
import About from './About.jsx';
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
        <div>New User? <a className={styles.link} onClick={toggleSignup}>Sign Up Here!</a></div>
      </form>
    )
  /*///////////////////////////
  Sign-Up Form
  ///////////////////////////*/
  } else if (!isLoggedIn && newUser) {
    return (
      <div className={styles.signup}>
        <About className={styles.about}/>
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
            <label>Charity Pledge: </label>
            <Field
            name='pledge'
            component='input'
            type='number'
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
          <div>Already a Member? <a className={styles.link} onClick={toggleSignup}>Log in Here!</a></div>
        </form>
      </div>
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