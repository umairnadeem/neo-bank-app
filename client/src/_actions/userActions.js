/* eslint-disable camelcase */

import { userService } from '../_services';
import { userConstants } from '../_constants';

/**
 * Dispatches the passed in action based on server response
 * @param {Object} data - The response object from the API
 * @param {String} onFail - The type to be dispatched upon 202 response
 * @param {Function} dispatch - The dispatch callback function
 */
const handleResponse = ({ data }, onFail, dispatch) => {
  const { http_code } = data;

  if (http_code && +http_code === 202) {
    dispatch({
      type: onFail,
      error: data.mfa ? data.mfa.message : 'MFA failed',
    });
  } else if (http_code && +http_code === 200) {
    dispatch({
      type: userConstants.LOGIN,
      payload: data,
    });
  }
};

/**
 * Dispatches the fail action upon a login error
 * @param {Object} response - The response object from the API
 * @param {Function} dispatch - The dispatch callback function
 */
const handleCatch = ({ response }, dispatch) => {
  const { data: { error } } = response;
  dispatch({
    type: userConstants.FAIL,
    error: error ? error.en : 'Login error',
  });
};

const authenticate = (answer = '') => (dispatch) => {
  dispatch({ type: userConstants.LOADING });

  userService.authenticate(answer)
    .then(data => handleResponse(data, userConstants.MFA_FAIL, dispatch))
    .catch(err => handleCatch(err, dispatch));
};

const login = (username = '', password = '') => (dispatch) => {
  dispatch({ type: userConstants.LOADING });

  userService.login(username, password)
    .then(data => handleResponse(data, userConstants.AUTH, dispatch))
    .catch(err => handleCatch(err, dispatch));
};

const logout = () => dispatch => dispatch({
  type: userConstants.LOGOUT,
});

const verify = () => (dispatch) => {
  dispatch({ type: userConstants.LOADING });

  userService.verify()
    .then(({ data }) => dispatch({
      type: userConstants.LOGIN,
      payload: data,
    }))
    .catch(() => dispatch({
      type: userConstants.LOGOUT,
    }));
};

export const userActions = {
  login,
  logout,
  verify,
  authenticate,
};

/* eslint-enable */
