import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountEntry from './AccountEntry';

const mapStateToProps = state => ({
  data: state.dashboard.data,
});

const Accounts = ({ data: { nodes } }) => (
  <div className="container">
    <h3>{ `Hi, ${nodes[0].client.name}!` }</h3>
    <p>Here are your accounts:</p>
    <ul>
      { nodes.map(({ _id, info }) => <AccountEntry key={_id} info={info} />)}
    </ul>
  </div>
);

Accounts.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, null)(Accounts);
