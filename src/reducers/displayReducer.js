const initialState = {
  newUser: false,
  currView: 'runner',
  displayLogger: false
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
    default:
      return state;
  }
}

export {
  displayReducer
};