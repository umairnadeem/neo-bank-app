import { dashboardConstants, userConstants } from '../_constants';

const initialState = {
  trans: null,
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
    case dashboardConstants.TRANS:
      return {
        trans: action.payload,
      };
    case dashboardConstants.TRANS_FAIL:
      return {
        trans: null,
      };
    default:
      return state;
  }
}
