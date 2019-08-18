import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginPage from './Login/LoginPage';
import Authenticate from './Login/Authenticate';
import Dashboard from './Dashboard';
import Verify from './_containers/Verify';

const mapStateToProps = state => ({
  authentication: state.authentication,
});

const App = ({
  authentication:
  {
    requiresLogin,
    requiresAuth,
    isLoggedIn,
  },
}) => (
  <Verify>
    <div className="flex">
      {requiresLogin && <LoginPage />}
      {requiresAuth && <Authenticate />}
      {isLoggedIn && <Dashboard />}
    </div>
  </Verify>
);

App.propTypes = {
  authentication: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, null)(App);
