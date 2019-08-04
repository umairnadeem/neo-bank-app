import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import LoginPage from './LoginPage';
import Authenticate from './Authenticate';
// import Sidebar from './Sidebar';
// import Main from './Main';

const mapStateToProps = state => ({
  authentication: state.authentication,
});

const actionCreators = () => ({
  userActions,
});

const App = ({ authentication }) => (
  <div className="container">
    {authentication.requiresLogin
      ? <LoginPage />
      : null }
    { authentication.requiresAuth
      ? <Authenticate />
      : null }
    {/* <Sidebar />
    <Main /> */}
  </div>
);

App.propTypes = {
  authentication: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, actionCreators)(App);
