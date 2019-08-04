import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../_actions';
import Error from './Error';

const actions = {
  authenticate: userActions.authenticate,
};

const mapStateToProps = state => ({
  authentication: state.authentication,
});

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
    const { authentication } = this.props;
    const { answer } = this.state;
    return (
      <div>
        <form name="mfa" onSubmit={this.handleSubmit}>
          <h1>MFA pin required:</h1>
          <label htmlFor="answer">
            <input name="answer" value={answer} type="text" onChange={this.handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
        { authentication.error
          ? <Error />
          : null }
      </div>
    );
  }
}

Authenticate.propTypes = {
  authenticate: PropTypes.func.isRequired,
  authentication: PropTypes.objectOf(PropTypes.any),
};

Authenticate.defaultProps = {
  authentication: {},
};

export default connect(mapStateToProps, actions)(Authenticate);
