import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  isLoading: state.authentication.isLoading,
});

/**
 * Presents a loading overlay upon children components
 */
const Load = ({ isLoading, children }) => (
  <React.Fragment>
    {isLoading && <div className="load" />}
    {children}
  </React.Fragment>
);

Load.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Load.defaultProps = {
  isLoading: false,
};

export default connect(mapStateToProps, null)(Load);
