import TEST_TYPE from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case TEST_TYPE:
      return action.payload || null;
    default:
      return state;
  }
}
