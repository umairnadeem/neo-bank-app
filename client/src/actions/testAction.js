import TEST_TYPE from './types';

const testAction = () => (dispatch) => {
  dispatch({
    type: TEST_TYPE,
    payload: 'test',
  });
};

export default testAction;
