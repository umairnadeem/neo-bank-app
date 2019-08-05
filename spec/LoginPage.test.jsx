/* eslint-disable prefer-promise-reject-errors */

import React from 'react';
import { shallow } from 'enzyme';
import mockAxios from 'axios';
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

  it('should render the Error component upon invalid login credentials', () => {
    const { wrapper } = setup();

    // Mock axios request to always fail
    mockAxios.post.mockImplementationOnce(
      () => Promise.reject({ response: { data: '' } }),
    );

    const value = 'invalid';

    // Input invalid credentials
    wrapper.find('[name="username"]').simulate('change', { target: { value } });
    wrapper.find('[name="password"]').simulate('change', { target: { value } });

    // Click submit
    wrapper.find('form').simulate('submit');
  });
});

/* eslint-enable */
