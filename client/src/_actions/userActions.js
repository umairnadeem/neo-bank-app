import { userService } from '../_services';
import { userConstants } from '../_constants';

const authenticate = (answer = '') => (dispatch) => {
  userService.authenticate(answer)
    .then((res) => {
      if (res === '202') {
        dispatch({
          type: userConstants.AUTH,
        });
      } else if (res === '200') {
        dispatch({
          type: userConstants.LOGIN,
        });
      }
    });
};

const login = (username, password) => (dispatch) => {
  userService.login(username, password)
    .then((res) => {
      if (res === '202') {
        dispatch({
          type: userConstants.AUTH,
        });
      } else if (res === '200') {
        dispatch({
          type: userConstants.LOGIN,
        });
      }
    })
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
  authenticate,
};
