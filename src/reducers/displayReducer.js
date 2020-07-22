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
    default:
      return state;
  }
}

export {
  displayReducer
};