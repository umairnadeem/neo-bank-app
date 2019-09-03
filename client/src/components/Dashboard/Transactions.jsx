import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dashboardActions } from '../../_actions';
import Graph from './Graph';

const mapStateToProps = state => ({
  trans: state.dashboard.trans,
  node: state.dashboard.node,
});

const actions = {
  getTrans: dashboardActions.getTrans,
};

class Transactions extends React.PureComponent {
  componentDidMount() {
    const { getTrans, node } = this.props;
    if (node) {
      getTrans(node);
    }
  }

  render() {
    const { trans } = this.props;
    return (
      <div className="container">
        {trans.data ? <Graph trans={trans} /> : 'Loading...'}
      </div>
    );
  }
}

Transactions.propTypes = {
  trans: PropTypes.objectOf(PropTypes.any),
  getTrans: PropTypes.func.isRequired,
  node: PropTypes.string,
};

Transactions.defaultProps = {
  trans: {},
  node: '',
};

export default connect(mapStateToProps, actions)(Transactions);
