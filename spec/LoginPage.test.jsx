/* eslint-disable prefer-promise-reject-errors */

import React from 'react';
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import LoginPage from '../client/src/components/LoginPage';
import store from '../client/src/_store';

const setup = () => {
  const props = { store };
  const wrapper = shallow(<LoginPage {...props} />).dive().dive();

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

  it('should render a form with username and password fields', () => {
    const { wrapper } = setup();

    // There should be 1 form
    expect(wrapper.find('form')).toHaveLength(1);

    // There should be an input with the name 'username'
    expect(wrapper.find('input[name="username"]')).toHaveLength(1);

    // There should be an input with the name 'password'
    expect(wrapper.find('input[name="password"]')).toHaveLength(1);
  });

  it('should not render the Error component upon mount', () => {
    const { wrapper } = setup();

    // the Error component should not be rendered
    expect(wrapper.find('Error')).toHaveLength(0);
  });

  it('should update username and password fields in component state', () => {
    const { wrapper } = setup();

    const input = {
      username: wrapper.find('input[name="username"]'),
      password: wrapper.find('input[name="password"]'),
    };

    // Simulate change in username field
    input.username.props().onChange({
      target: {
        name: 'username',
        value: 'usernameTest',
      },
    });

    // Expect the change to update state with entered username
    expect(wrapper.state('username')).toEqual('usernameTest');

    // Simulate change in password field
    input.password.props().onChange({
      target: {
        name: 'password',
        value: 'passwordTest',
      },
    });

    // Expect the change to update state with entered password
    expect(wrapper.state('password')).toEqual('passwordTest');
  });
});

/* eslint-enable */
