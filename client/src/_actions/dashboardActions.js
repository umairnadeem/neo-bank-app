/* eslint-disable camelcase */

import { dashboardService } from '../_services';
import { dashboardConstants } from '../_constants';

const getTrans = (node) => dispatch => dashboardService.getTrans(node)
  .then(({ data }) => {
    console.log(data);
  })
  .catch(err => console.log(err));

export const dashboardActions = {
  getTrans,
};

/* eslint-enable */
