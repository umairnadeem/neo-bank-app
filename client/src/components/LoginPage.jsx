import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import Authenticate from './Authenticate';

const actions = {
  login: userActions.login,
  logout: userActions.logout,
};

const mapStateToProps = state => ({
  authentication: state.authentication,
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { login } = this.props;
    const { username, password } = this.state;

    if (username && password) {
      login(username, password);
    }
  }

  render() {
    const { authentication } = this.props;
    const { username, password } = this.state;

    return (
      <div>
        <form name="form" onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <label htmlFor="username">
            Username:
            <input name="username" type="text" value={username} onChange={this.handleChange} />
          </label>
          <label htmlFor="password">
            Password:
            <input name="password" type="text" value={password} onChange={this.handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
        { authentication.requiresAuth
          ? <Authenticate />
          : null}
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  authentication: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, actions)(LoginPage);
