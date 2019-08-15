import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import LoginPage from './LoginPage';
import Authenticate from './Authenticate';
import Sidebar from './Sidebar';
import Main from './Main';

const mapStateToProps = state => ({
  authentication: state.authentication,
});

const actionCreators = () => ({
  verify: userActions.verify,
});

class App extends React.Component {
  componentDidMount() {
    const { verify, authentication: { requiresLogin } } = this.props;
    if (requiresLogin) {
      verify();
    }
  }

  render() {
    const {
      authentication:
      {
        requiresLogin,
        requiresAuth,
        isLoggedIn,
      },
    } = this.props;

    return (
      <div className="flex">
        {requiresLogin
          ? <LoginPage />
          : null }
        { requiresAuth
          ? <Authenticate />
          : null }
        { isLoggedIn
          ? (
            <Fragment>
              <Sidebar />
              <Main />
            </Fragment>
          )
          : null }
      </div>
    );
  }
}

App.propTypes = {
  authentication: PropTypes.objectOf(PropTypes.any).isRequired,
  verify: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(App);
