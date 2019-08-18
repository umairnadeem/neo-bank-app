/* eslint-disable no-underscore-dangle */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountEntry from './AccountEntry';
import { dashboardActions } from '../../_actions';

const mapStateToProps = state => ({
  data: state.dashboard.data,
});

const actions = {
  changeNode: dashboardActions.changeNode,
};

const Accounts = ({ changeNode, data: { nodes } }) => {
  useEffect(() => {
    if (nodes[0]) {
      changeNode(nodes[0]._id);
    }
  });

  return (
    <div className="container">
      <h3>{ `Hi, ${nodes[0] && nodes[0].client.name}!` }</h3>
      <p>Here are your accounts:</p>
      <ul>
        { nodes.map(({ _id, info }) => <AccountEntry key={_id} info={info} />)}
      </ul>
    </div>
  );
};

Accounts.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  changeNode: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(Accounts);

/* eslint-enable */
