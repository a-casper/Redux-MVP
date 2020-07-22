import Axios from 'axios';

const submitLogin = (formData) => {
  return async (dispatch) => {
    let userData;
    if(Object.keys(formData).length === 2) {
      userData = await Axios.post('/login', formData);
      userData = userData.data;
    } else {
      userData = await Axios.post('/signup', formData);
      userData = userData.data;
    }
    dispatch({
      type: "SUBMIT_LOGIN",
      userData
    })
  }
}

const submitRun = (formData) => {
  return async (dispatch, getState) => {
    const user = getState().databaseReducer.user;
    console.log(user);
    let userData
    let sec = formData.sec || 0;
    let min = formData.min || 0;
    let hr = formData.hr || 0;
    let dataBaseTime = parseInt(sec) + (parseInt(min) * 60) + (parseInt(hr) * 3600);
    //api call
    //dispatch
    dispatch({
      type: "SUBMIT_RUN",
      userData
    })
  }
}

export {
  submitLogin,
  submitRun
};