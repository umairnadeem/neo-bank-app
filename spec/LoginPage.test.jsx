import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from '../client/src/components/LoginPage';
import store from '../client/src/_store';

const setup = () => {
  const props = { store };
  const wrapper = shallow(<LoginPage {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('Login page component', () => {
  it('should render without exploding', () => {
    const { wrapper } = setup();

    // Component should render without errors
    expect(wrapper.length).toEqual(1);
  });
});
