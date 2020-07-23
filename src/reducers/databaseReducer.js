import { runFormatter, teamAggregator } from './helpers/calculators';
import _ from 'lodash';

const initialState = {
  user: null,
  runs: null,
  team: null,
  teammates: null,
  teams: null
}

const databaseReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case "SUBMIT_LOGIN":
      //if login failed:
      if (action.userData.runs === undefined) {
        return state;
      }
      //else format all data
      runFormatter(action.userData.runner, action.userData.runs);
      let team = action.userData.team === null ? null : action.userData.team.rows[0];
      let teammates = action.userData.teammates === null ? null : action.userData.teammates.rows
      if (teammates !== null){
        teammates.forEach(member => {
          runFormatter(member, member.runs)
        })
        teamAggregator(team, teammates);
      }

      return {
        ...state,
        user: action.userData.runner,
        runs: action.userData.runs,
        team,
        teammates,
        teams: action.userData.teams
      };

    case "UPDATE_RUNS":
      //update user and run data
      newState = _.cloneDeep(state);
      newState.runs = action.runs.data
      //need to update here and in team members
      if(newState.teammates !== null) {
        newState.teammates.forEach(member => {
          if(newState.user.id === member.id) {
            member.runs = action.runs.data
          };
          runFormatter(member, member.runs)
        })
        teamAggregator(newState.team, newState.teammates);
      }

      runFormatter(newState.user, newState.runs)

      return newState;
      break;

    case "CREATE_TEAM":
      newState = _.cloneDeep(state);
      newState.user = action.team.data.runner;
      newState.team = action.team.data.team;
      newState.teammates = action.team.data.teammates


      runFormatter(newState.user, newState.runs)

      if(newState.teammates !== null) {
        newState.teammates.forEach(member => {
          runFormatter(member, member.runs)
        })
        teamAggregator(newState.team, newState.teammates);
      }
      return newState;
    default:
      return state;
  }
}

export {
  databaseReducer
};