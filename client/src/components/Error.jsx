import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { authentication: { error } } = state;
  return { error };
};

const Error = ({ error }) => (
  <div className="error">
    {error}
  </div>
);

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Error);
