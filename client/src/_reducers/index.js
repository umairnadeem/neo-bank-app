import { combineReducers } from 'redux';
import authentication from './userReducers';

const rootReducer = combineReducers({
  authentication,
});

export default rootReducer;
