import { userService } from '../_services';
import { userConstants } from '../_constants';

const login = (username, password) => (dispatch) => {
  userService.login(username, password)
    .then((res) => {
      if (res === '202') {
        dispatch({
          type: userConstants.AUTH,
        });
      } else {
        dispatch({
          type: userConstants.LOGIN,
        });
      }
    })
    .catch(() => dispatch({
      type: userConstants.FAIL,
    }));
};

const authenticate = answer => (dispatch) => {
  userService.authenticate(answer)
    .then((res) => {
      if (res === '202') {
        dispatch({
          type: userConstants.AUTH,
        });
      } else {
        dispatch({
          type: userConstants.LOGIN,
        });
      }
    });
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
