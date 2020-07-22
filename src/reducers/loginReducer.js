const initialState = {
  newUser: false,
}

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case "TOGGLE_SIGNUP":
      return {
        ...state,
        newUser: !state.newUser
      };
    default:
      return state;
  }
}

export {
  loginReducer
};