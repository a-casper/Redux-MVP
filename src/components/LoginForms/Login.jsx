import React from 'react';
import styles from '../../styles/loginView.css';
import { Field, reduxForm } from 'redux-form';

let Login = ({ handleSubmit, toggleSignup }) => {
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
};

Login = reduxForm({
  form: "Login"
})(Login);

export default Login;