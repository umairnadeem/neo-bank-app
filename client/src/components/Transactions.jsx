import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LineChart from './LineChart';
import { dashboardActions } from '../_actions';

const mapStateToProps = state => ({
  trans: state.dashboard.trans,
  node: state.dashboard.node,
});

const actions = {
  getTrans: dashboardActions.getTrans,
};

class Transactions extends React.PureComponent {
  componentDidUpdate() {
    const { getTrans, node } = this.props;
    if (node) {
      getTrans(node);
    }
  }

  render() {
    const { trans } = this.props;
    return (
      <div className="container">
        <LineChart data={trans} />
      </div>
    );
  }
}

Transactions.propTypes = {
  trans: PropTypes.arrayOf(PropTypes.any),
  getTrans: PropTypes.func.isRequired,
  node: PropTypes.string,
};

Transactions.defaultProps = {
  trans: [],
  node: '',
};

export default connect(mapStateToProps, actions)(Transactions);
