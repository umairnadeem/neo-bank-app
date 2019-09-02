/* eslint-disable no-underscore-dangle */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LineGraph from 'react-line-graph';
import AccountEntry from './AccountEntry';
import { dashboardActions } from '../../_actions';


const mapStateToProps = state => ({
  data: state.dashboard.data,
});

const actions = {
  changeNode: dashboardActions.changeNode,
};

const Graph = () => {
  const data = (new Array(100)).fill().map(() => Math.random());
  const props = {
    data,
    strokeWidth: 3,
    hover: true,
  };
  return (
    <div className="container">
      <p>Here is your data:</p>
      <LineGraph {...props} />
    </div>
  );
};

Graph.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  changeNode: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(Graph);

/* eslint-enable */
