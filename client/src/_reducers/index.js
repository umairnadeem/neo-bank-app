import { combineReducers } from 'redux';
import authentication from './userReducers';
import dashboard from './dashboardReducers';

const rootReducer = combineReducers({
  authentication,
  dashboard,
});

export default rootReducer;
