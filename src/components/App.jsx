import React from 'react';

import Header from './Header.jsx';
import LoginView from './LoginView';
import IndividualView from './IndividualView';
import TeamView from './TeamView';
import RunView from './RunView';
import RunLogView from './RunLogView';

import styles from '../styles/app.css'


const App = (props) => {

  return(
    <div className={styles.container}>
      <Header />
      <LoginView />
      {/* <IndividualView />
      <TeamView />
      <RunView />
      <RunLogView /> */}
    </div>
  )
}

export default App;