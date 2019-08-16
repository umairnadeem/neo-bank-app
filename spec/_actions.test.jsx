/* eslint-disable prefer-promise-reject-errors */

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import mockAxios from 'axios';
import { userConstants } from '../client/src/_constants';
import { userActions } from '../client/src/_actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Login action creator behavior', () => {
  it('should dispatch FAIL action upon invalid login information', () => {
    const store = mockStore({});

    const expectedActions = [{ type: userConstants.FAIL, error: 'Login error' }];

    // Mock axios request to always fail
    mockAxios.post.mockImplementationOnce(
      () => Promise.reject({ response: { data: '' } }),
    );

    // Invalid login information should result in FAIL action being dispatched
    return store.dispatch(userActions.login('invalid', 'invalid'))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
  });

  it('should dispatch LOGIN SUCCESS action upon non-MFA login information', () => {
    const store = mockStore({});

    const expectedActions = [{ type: userConstants.LOGIN }];

    // Mock axios request to always return 200 http_code
    mockAxios.post.mockImplementationOnce(
      () => Promise.resolve({ data: { http_code: 200 } }),
    );

    // Valid login information with MFA should result in successful login
    return store.dispatch(userActions.login('synapse_nomfa', 'test1234'))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
  });

  it('should dispatch MFA REQUIRED action upon MFA-enabled login information', () => {
    const store = mockStore({});

    const expectedActions = [{ type: userConstants.AUTH }];

    // Mock axios request to always return 202 http_code
    mockAxios.post.mockImplementationOnce(
      () => Promise.resolve({ data: { http_code: 202 } }),
    );

    // Valid login information should result in MFA screen
    return store.dispatch(userActions.login('synapse_test', 'test1234'))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
  });

  it('should dispatch MFA FAILED action upon invalid MFA information', () => {
    const store = mockStore({});

    const expectedActions = [{ type: userConstants.MFA_FAIL }];

    // Mock axios request to always return 202 http_code
    mockAxios.post.mockImplementationOnce(
      () => Promise.resolve({ data: { http_code: 202, mfa: { message: 'Invalid MFA' } } }),
    );

    // Wrong answer should result in MFA_FAIL action
    return store.dispatch(userActions.authenticate('wrong_answer'))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
  });

  it('should allow multiple MFA stages upon valid MFA information', () => {
    const store = mockStore({});

    const expectedActions = [{ type: userConstants.MFA_FAIL }];

    // Mock axios request to always return 202 http_code
    mockAxios.post.mockImplementationOnce(
      () => Promise.resolve({ data: { http_code: 202, mfa: { message: 'Repeat MFA' } } }),
    );

    // => Function to return multiple chained promises which make repeated MFA authentications
    const multipleMFA = (stage = 0) => store.dispatch(userActions.authenticate('test_answer'))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
        if (stage < 3) {
          return multipleMFA(stage + 1);
        }
        return true;
      });

    return multipleMFA();
  });

  it('should dispatch LOGOUT action upon logout', () => {
    const store = mockStore({});

    const expectedActions = [{ type: userConstants.LOGOUT }];

    store.dispatch(userActions.logout());

    // Logging out should result in logout action beding dispatched
    expect(store.getActions()).toMatchObject(expectedActions);
  });
});

/* eslint-enable */
