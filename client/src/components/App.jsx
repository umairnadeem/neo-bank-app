import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import LoginPage from './Login/LoginPage';
import Authenticate from './Login/Authenticate';
import Dashboard from './Dashboard';

const actions = {
  verify: userActions.verify,
};

const mapStateToProps = state => ({
  authentication: state.authentication,
});

class App extends React.PureComponent {
  componentDidMount() {
    const { verify, authentication: { requiresLogin } } = this.props;
    if (requiresLogin) {
      verify();
    }
  }

  render() {
    const {
      authentication:
      {
        requiresLogin,
        requiresAuth,
        isLoggedIn,
      },
    } = this.props;

    return (
      <div className="flex">
        {requiresLogin
          ? <LoginPage />
          : null }
        { requiresAuth
          ? <Authenticate />
          : null }
        { isLoggedIn
          ? <Dashboard />
          : null }
      </div>
    );
  }
}

App.propTypes = {
  authentication: PropTypes.objectOf(PropTypes.any).isRequired,
  verify: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(App);
