/* eslint-disable camelcase */

import { dashboardService } from '../_services';
import { dashboardConstants } from '../_constants';

const getTrans = node => dispatch => dashboardService.getTrans(node)
  .then(({ data }) => {
    const { http_code } = data;

    if (http_code && +http_code === 202) {
      dispatch({
        type: dashboardConstants.TRANS_FAIL,
      });
    } else if (http_code && +http_code === 200) {
      dispatch({
        type: dashboardConstants.TRANS,
        payload: data,
      });
    }
  })
  .catch(({ response }) => {
    const { data: { error } } = response;
    dispatch({
      type: dashboardConstants.TRANS_FAIL,
      error: error ? error.en : 'Error getting transactions',
    });
  });

const changeNode = node => dispatch => dispatch({
  type: dashboardConstants.NODE,
  payload: node,
});

export const dashboardActions = {
  getTrans,
  changeNode,
};

/* eslint-enable */
