import React from 'react';

const TeamView = ( { view, user, team } ) => {
  //if not logged in or not on team page, display nothing
  if(view !== 'team' || user === null) {
    return null;
  //if the user is not on a team, prompt them to create or sign up for a team
  } else if(team === null) {
    return (
      <button>Sign up for a Team to run for charity!</button>
    )
  }

  return (
    <h1>display team members placeholder</h1>
  )


};

export default TeamView;