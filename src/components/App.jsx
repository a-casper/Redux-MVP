import React from 'react';
import { connect } from 'react-redux';

import Header from './Header.jsx';
import LoginView from './LoginView';
import IndividualView from './IndividualView';
import TeamView from './TeamView';
import RunView from './RunView';
import RunLogView from './RunLogView';

import styles from '../styles/app.css'


const App = ({ currentView, user, team, runs }) => {

  return(
    <div className={styles.container}>
      <Header
      user={user}
      />
      <LoginView />
      <IndividualView
      view={currentView}
      user={user}
      runs={runs}
      />
      <TeamView
      view={currentView}
      user={user}
      team={team}
      />
      <RunView
      view={currentView}
      user={user}
      runs={runs}
      />
      <RunLogView />
    </div>
  )
}

const select = state => ({
  currentView: state.displayReducer.currView,
  user: state.databaseReducer.user,
  team: state.databaseReducer.team,
  runs: state.databaseReducer.runs
});

export default connect(select, null)(App);;