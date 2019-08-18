import { userConstants } from '../_constants';

const initialState = {
  requiresLogin: true,
  isLoggedIn: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case userConstants.LOGIN:
      return {
        isLoggedIn: true,
      };
    case userConstants.LOGOUT:
      return {
        requiresLogin: true,
        isLoggedIn: false,
      };
    case userConstants.FAIL:
      return {
        requiresLogin: true,
        error: action.error,
      };
    case userConstants.AUTH:
      return {
        requiresAuth: true,
        message: action.payload,
      };
    case userConstants.MFA_FAIL:
      return {
        requiresAuth: true,
        error: action.error,
      };
    default:
      return state;
  }
}
