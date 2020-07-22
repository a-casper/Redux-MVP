import React from 'react';

const TeamView = ( { view, user, team } ) => {
  if(view === 'team' && user !== null) {
    return (
      <h1>TEAM PAGE!</h1>
    )
  } else {
    return null;
  }
};

export default TeamView;