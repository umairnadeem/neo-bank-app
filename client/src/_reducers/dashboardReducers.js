import { dashboardConstants } from '../_constants';

const initialState = {
  trans: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
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
