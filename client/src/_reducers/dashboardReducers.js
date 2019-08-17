/* eslint-disable no-underscore-dangle */

import { dashboardConstants, userConstants } from '../_constants';

const initialState = {
  trans: [],
  data: [],
  node: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case dashboardConstants.NODE:
      return Object.assign({}, state, { node: action.payload });
    case userConstants.LOGIN:
      return {
        data: action.payload,
        node: action.payload.nodes[0] ? action.payload.nodes[0]._id : '',
      };
    case userConstants.LOGOUT:
      return {
        data: [],
      };
    // case dashboardConstants.TRANS:
    //   return {
    //     trans: action.payload,
    //   };
    // case dashboardConstants.TRANS_FAIL:
    //   return {
    //     trans: [],
    //   };
    default:
      return state;
  }
}

/* eslint-enable */
