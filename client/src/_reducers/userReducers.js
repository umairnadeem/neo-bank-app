import { userConstants } from '../_constants';

const initialState = {
  isLoggedIn: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN:
      return {
        isLoggedIn: true,
        success: true,
      };
    case userConstants.LOGOUT:
      return {
        isLoggedIn: false,
      };
    case userConstants.FAIL:
      return {
        success: false,
      };
    default:
      return state;
  }
}
