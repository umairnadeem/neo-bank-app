/* eslint-disable camelcase */

import { userService } from '../_services';
import { userConstants } from '../_constants';

const authenticate = (answer = '') => (dispatch) => {
  userService.authenticate(answer)
    .then(({ data }) => {
      const { http_code } = data;
      console.log(http_code)
      if (http_code === 202 || http_code === '202') {
        const { mfa: { message } } = data;
        dispatch({
          type: userConstants.MFA_FAIL,
          error: message,
        });
      } else if (http_code === 200 || http_code === '200') {
        dispatch({
          type: userConstants.LOGIN,
        });
      }
    })
    .catch(({ response }) => {
      const { data: { error } } = response;
      dispatch({
        type: userConstants.FAIL,
        error,
      });
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
    .catch(({ response }) => {
      const { error } = response.data;
      dispatch({
        type: userConstants.FAIL,
        error: error.en,
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

/* eslint-enable */
