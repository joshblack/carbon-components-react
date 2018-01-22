import React from 'react';
import { mount } from 'enzyme';
import { TableContainer } from '../';

describe('TableContainer', () => {
  it('should render', () => {
    const wrapper = mount(<TableContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
