import { userService } from '../_services';
import { userConstants } from '../_constants';

const authenticate = (answer = '') => (dispatch) => {
  userService.authenticate(answer)
    .then(({ data }) => {
      if (data === 202) {
        dispatch({
          type: userConstants.AUTH,
        });
      } else if (data === 200) {
        dispatch({
          type: userConstants.LOGIN,
        });
      }
    });
};

const login = (username, password) => (dispatch) => {
  userService.login(username, password)
    .then(({ data }) => {
      if (data === 202) {
        dispatch({
          type: userConstants.AUTH,
        });
      } else if (data === 200) {
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
