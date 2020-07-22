const initialState = {
  user: null,
  runs: null,
  team: null
}

const databaseReducer = (state = initialState, action) => {
  switch(action.type) {
    case "SUBMIT_LOGIN":
      //use newUser to determine if it is a login or signup
      console.log(action)
      return {
        ...state,
        user: action.userData[0],
        runs: action.userData[1],
        team: action.userData[3]
      };
    default:
      return state;
  }
}

export {
  databaseReducer
};