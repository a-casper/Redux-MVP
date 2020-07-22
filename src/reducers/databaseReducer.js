import { runCalculator, totalCalculator} from './helpers/calculators';

const initialState = {
  user: null,
  runs: null,
  team: null
}

const databaseReducer = (state = initialState, action) => {
  switch(action.type) {
    case "SUBMIT_LOGIN":
      //need to modify data before returning. need formatted times
      return {
        ...state,
        user: action.userData[0],
        runs: action.userData[1],
        team: action.userData[3] || null
      };
    default:
      return state;
  }
}

export {
  databaseReducer
};