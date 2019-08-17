/* eslint-disable camelcase */

import { dashboardService } from '../_services';
import { dashboardConstants } from '../_constants';

const getTrans = node => dispatch => dashboardService.getTrans(node)
  .then(data => dispatch({
    type: dashboardConstants.TRANS,
    payload: data,
  }))
  .catch(error => dispatch({
    type: dashboardConstants.TRANS_FAIL,
    error: error ? error.en : 'Error getting transactions',
  }));

const changeNode = node => dispatch => dispatch({
  type: dashboardConstants.NODE,
  payload: node,
});

export const dashboardActions = {
  getTrans,
  changeNode,
};

/* eslint-enable */
