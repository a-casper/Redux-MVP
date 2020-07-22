import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { loginReducer } from './loginReducer';
import { databaseReducer } from './databaseReducer';

export default combineReducers({
  form,
  loginReducer,
  databaseReducer
});