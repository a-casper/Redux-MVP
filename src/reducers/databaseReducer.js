import { runFormatter } from './helpers/calculators';

const initialState = {
  user: null,
  runs: null,
  team: null
}

const databaseReducer = (state = initialState, action) => {
  switch(action.type) {
    case "SUBMIT_LOGIN":
      //need to modify data before returning. need formatted times
      runFormatter(action.userData[0], action.userData[1]);

      return {
        ...state,
        user: action.userData[0],
        runs: action.userData[1],
        team: action.userData[2] || null
      };
    case "UPDATE_RUNS":
      //update user and run data
      let newState = {
        ...state,
        runs: action.runs.data,
        user: {
          ...state.user
        }
      }
      runFormatter(newState.user, newState.runs)
      return newState;
    default:
      return state;
  }
}

export {
  databaseReducer
};