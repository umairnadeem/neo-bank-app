import { userConstants } from '../_constants';

const login = (e) => {
  e.preventDefault();
  return (dispatch) => {
    dispatch({
      type: userConstants.LOGIN,
      payload: true,
    });
  };
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
