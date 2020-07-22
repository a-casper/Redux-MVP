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

export {
  submitLogin
};