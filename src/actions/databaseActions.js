import Axios from 'axios';

const submitLogin = (formData) => {
  return async (dispatch) => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  }
}

const submitRun = (formData) => {
  return async (dispatch, getState) => {
    try {
      //format data for API call
      const user = getState().databaseReducer.user;
      let sec = formData.sec || 0;
      let min = formData.min || 0;
      let hr = formData.hr || 0;
      let databaseTime = parseInt(sec) + (parseInt(min) * 60) + (parseInt(hr) * 3600);

      let runData = {
        miles: formData.miles,
        id: user.id,
        time: databaseTime,
        date: formData.date
      }

      //api call
      let runs = await Axios.post('/run', runData)

      //dispatch
      dispatch({
        type: "UPDATE_RUNS",
        runs
      })
    } catch (err) {
      console.log(err);
    }

  }
}

const deleteRun = (e) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().databaseReducer.user.id;
      let runs = await Axios.delete(`/runs?id=${e.target.value}&runnerId=${userId}`);
      dispatch({
        type: "UPDATE_RUNS",
        runs
      })
    } catch (err) {
      console.log(err);
    }

  };
}

const createTeam = (formData) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().databaseReducer.user.id;
      let request = {
        ...formData,
        userId
      };

      //api request
      let team;
      if(Object.keys(formData).length > 1) {
        team = await Axios.post('/teams', request);
      } else {
        //joining team
        team = await Axios.post('/join', request);
      }
      //dispatch
      dispatch({
        type: "CREATE_TEAM",
        team
      })
    } catch (err) {
      console.log(err);
    }

  }
}

const submitGoal = (formData) => {
  return async (dispatch, getState) => {
    try {
      const id = getState().databaseReducer.user.id;
      formData.id = id;
      let user = await Axios.post('/goal', formData);
      dispatch({
        type: "SUBMIT_GOAL",
        user
      })
    } catch (err) {
      console.log(err);
    }
  };
};

export {
  submitLogin,
  submitRun,
  deleteRun,
  createTeam,
  submitGoal
};