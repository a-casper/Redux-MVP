const initialState = {
  newUser: false,
  currView: 'runner',
  displayLogger: false,
  displayGoalLog: false,
}

const displayReducer = (state = initialState, action) => {
  switch(action.type) {
    case "TOGGLE_SIGNUP":
      return {
        ...state,
        newUser: !state.newUser
      };
    case "CHANGE_DISPLAY":
      return {
        ...state,
        currView: action.tabName
      }
    case "TOGGLE_LOGGER":
      return {
        ...state,
        displayLogger: !state.displayLogger
      }
    case "TOGGLE_GOAL":
      return {
        ...state,
        displayGoalLog: !state.displayGoalLog
      }
    default:
      return state;
  }
}

export {
  displayReducer
};