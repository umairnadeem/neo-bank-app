import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import Error from './Error';
import { useForm } from '../_helpers';

const actions = {
  login: userActions.login,
  logout: userActions.logout,
};

const mapStateToProps = state => ({
  authentication: state.authentication,
});

const LoginPage = ({ login, authentication }) => {
  const [values, handleChange, handleSubmit] = useForm({ username: '', password: '' });

  const submit = ({ username, password }) => {
    if (username && password) {
      login(username, password);
    }
  };

  return (
    <div>
      <form name="form" className="container" onSubmit={e => handleSubmit(e, submit)}>
        <h1>Login</h1>
        <input name="username" type="text" value={values.username} onChange={handleChange} placeholder="Username" />
        <input name="password" type="text" value={values.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
      {authentication.error && <Error />}
    </div>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  authentication: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, actions)(LoginPage);
