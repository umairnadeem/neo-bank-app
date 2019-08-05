import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { userConstants } from '../client/src/_constants';
import { userActions } from '../client/src/_actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Login action creator behavior', () => {
  it('should return FAIL action upon invalid login information', () => {
    const store = mockStore({});

    const expectedActions = [{ type: userConstants.FAIL, error: 'Login error' }];

    return store.dispatch(userActions.login('invalid', 'invalid'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
