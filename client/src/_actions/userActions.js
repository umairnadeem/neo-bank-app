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
    })
    .catch(({ error }) => dispatch({
      type: userConstants.FAIL,
      error,
    }));
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
    .catch(({ response }) => {
      const { error } = response.data;
      dispatch({
        type: userConstants.FAIL,
        error,
      });
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
  authenticate,
};
