import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../_actions';

const actions = {
  authenticate: userActions.authenticate,
};

class Authenticate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: '',
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
    const { authenticate } = this.props;
    const { answer } = this.state;

    authenticate(answer);
  }

  render() {
    return (
      <div>
        <form name="mfa" onSubmit={this.handleSubmit}>
          <h1>MFA pin required:</h1>
          <label htmlFor="mfa_answer">
            <input id="mfa_answer" type="text" onChange={this.handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

Authenticate.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default connect(null, actions)(Authenticate);
