import { userService } from '../_services';
import { userConstants } from '../_constants';

const login = (username, password) => (dispatch) => {
  userService.login(username, password)
    .then(() => dispatch({
      type: userConstants.LOGIN,
    }))
    .catch(() => dispatch({
      type: userConstants.FAIL,
    }));
};

const logout = () => (dispatch) => {
  dispatch({
    type: userConstants.LOGOUT,
  });
};

export const userActions = {
  login,
  logout,
};
