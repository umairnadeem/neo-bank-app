import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

const actions = {
  login: userActions.login,
  logout: userActions.logout,
};

const LoginPage = ({ login }) => (
  <form>
    <h1>Login</h1>
    <label htmlFor="username">
      Username:
      <input id="username" type="text" />
    </label>
    <label htmlFor="password">
      Password:
      <input id="password" type="text" />
    </label>
    <button type="submit" onClick={login}>Submit</button>
  </form>
);

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, actions)(LoginPage);
