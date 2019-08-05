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

    mockAxios.post.mockImplementationOnce(
      () => Promise.reject({ response: { data: '' } }),
    );

    return store.dispatch(userActions.login('invalid', 'invalid'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch LOGIN SUCCESS action upon non-MFA login information', () => {
    const store = mockStore({});

    const expectedActions = [{ type: userConstants.LOGIN }];

    mockAxios.post.mockImplementationOnce(
      () => Promise.resolve({ data: { http_code: 200 } }),
    );

    return store.dispatch(userActions.login('synapse_nomfa', 'test1234'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

/* eslint-enable */
