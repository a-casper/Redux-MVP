import { runFormatter } from './helpers/calculators';

const initialState = {
  user: null,
  runs: null,
  team: null,
  teammates: null
}

const databaseReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case "SUBMIT_LOGIN":
      //need to modify data before returning. need formatted times
      runFormatter(action.userData.runner, action.userData.runs);
      let team = action.userData.team === null ? null : action.userData.team.rows[0];
      return {
        ...state,
        user: action.userData.runner,
        runs: action.userData.runs,
        team
      };

    case "UPDATE_RUNS":
      //update user and run data
      newState = {
        ...state,
        runs: action.runs.data,
        user: {
          ...state.user
        }
      }
      runFormatter(newState.user, newState.runs)
      return newState;
      break;
    case "CREATE_TEAM":
      newState = {
        ...state,
      };
      console.log(action.team);
      return newState;
    default:
      return state;
  }
}

export {
  databaseReducer
};