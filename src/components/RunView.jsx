import React from 'react';

const RunView = ( { view, user, runs } ) => {
  if(view === 'runs' && user !== null) {
    return (
      <h1>RUNS PAGE!</h1>
    )
  } else {
    return null;
  }
};

export default RunView;