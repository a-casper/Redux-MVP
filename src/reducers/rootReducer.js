import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { displayReducer } from './displayReducer';
import { databaseReducer } from './databaseReducer';

export default combineReducers({
  form,
  displayReducer,
  databaseReducer
});