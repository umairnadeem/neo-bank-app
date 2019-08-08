import { userConstants } from '../_constants';

const initialState = {
  data: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN:
      return {
        data: action.payload,
      };
    case userConstants.LOGOUT:
      return {
        data: null,
      };
    default:
      return state;
  }
}
