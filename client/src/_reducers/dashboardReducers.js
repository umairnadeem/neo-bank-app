/* eslint-disable no-underscore-dangle */

import { dashboardConstants, userConstants } from '../_constants';

const initialState = {
  trans: {},
  data: {},
  node: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case dashboardConstants.NODE:
      return Object.assign({}, state, { node: action.payload });
    case userConstants.LOGIN:
      return Object.assign({}, state, {
        data: action.payload,
        node: action.payload.nodes[0] ? action.payload.nodes[0]._id : '',
      });
    case userConstants.LOGOUT:
      return Object.assign({}, state, { trans: {} });
    case dashboardConstants.TRANS:
      return Object.assign({}, state, { trans: action.payload });
    case dashboardConstants.TRANS_FAIL:
      return Object.assign({}, state, { trans: {} });
    default:
      return state;
  }
}

/* eslint-enable */
