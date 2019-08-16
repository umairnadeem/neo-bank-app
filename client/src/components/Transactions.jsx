import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LineChart from './LineChart';

const mapStateToProps = state => ({
  trans: state.dashboard.trans,
});

const Transactions = ({ trans }) => (
  <div className="container">
    <LineChart data={trans} />
  </div>
);

Transactions.propTypes = {
  trans: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, null)(Transactions);
