/* eslint-disable camelcase */

import { userService } from '../_services';
import { userConstants } from '../_constants';

const authenticate = (answer = '') => (dispatch) => {
  dispatch({ type: userConstants.LOADING });

  userService.authenticate(answer)
    .then(({ data }) => {
      const { http_code } = data;

      if (http_code && +http_code === 202) {
        const { mfa: { message } } = data;
        dispatch({
          type: userConstants.MFA_FAIL,
          error: message,
        });
      } else if (http_code && +http_code === 200) {
        dispatch({
          type: userConstants.LOGIN,
          payload: data,
        });
      }
    })
    .catch(({ response }) => {
      const { data: { error } } = response;
      dispatch({
        type: userConstants.FAIL,
        error: error ? error.en : 'MFA error',
      });
    });
};

const login = (username, password) => (dispatch) => {
  dispatch({ type: userConstants.LOADING });

  userService.login(username, password)
    .then(({ data }) => {
      const { http_code } = data;

      if (http_code && +http_code === 202) {
        dispatch({
          type: userConstants.AUTH,
          payload: data.mfa ? data.mfa.message : 'MFA failed',
        });
      } else if (http_code && +http_code === 200) {
        dispatch({
          type: userConstants.LOGIN,
          payload: data,
        });
      }
    })
    .catch(({ response }) => {
      const { data: { error } } = response;
      dispatch({
        type: userConstants.FAIL,
        error: error ? error.en : 'Login error',
      });
    });
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
