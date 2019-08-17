import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../../_actions';
import { useForm } from '../_helpers';
import Error from './Error';

const actions = {
  authenticate: userActions.authenticate,
};

const mapStateToProps = state => ({
  authentication: state.authentication,
});

const Authenticate = ({ authenticate, authentication }) => {
  const [values, handleChange, handleSubmit] = useForm({ answer: '' });
  const submit = ({ answer }) => {
    authenticate(answer);
  };

  return (
    <div>
      <form name="mfa" className="container" onSubmit={e => handleSubmit(e, submit)}>
        <h1>{authentication.message || 'MFA Required: '}</h1>
        <input name="answer" value={values.answer} type="text" onChange={handleChange} placeholder="Your answer" />
        <button type="submit">Submit</button>
      </form>
      { authentication.error
        ? <Error />
        : null }
    </div>
  );
};

Authenticate.propTypes = {
  authenticate: PropTypes.func.isRequired,
  authentication: PropTypes.objectOf(PropTypes.any),
};

Authenticate.defaultProps = {
  authentication: {},
};

export default connect(mapStateToProps, actions)(Authenticate);
