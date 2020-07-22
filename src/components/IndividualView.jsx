import React from 'react';

const IndividualView = ( { view, user } ) => {
  if(view === 'runner' && user !== null) {
    return (
      <h1>{user.name}</h1>
    )
  } else {
    return null;
  }
};

export default IndividualView;