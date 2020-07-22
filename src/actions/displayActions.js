const toggleSignup = () => {
  return {
    type: "TOGGLE_SIGNUP"
  }
};

const changeDisplay = (event) => {
  return {
    type: "CHANGE_DISPLAY",
    tabName: event.target.value
  }
};

const toggleLogger = () => {
  return {
    type: "TOGGLE_LOGGER"
  }
}

export {
  toggleSignup,
  changeDisplay,
  toggleLogger
};