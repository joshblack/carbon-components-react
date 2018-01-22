import React from 'react';
import { mount } from 'enzyme';
import { Table } from '../';

describe('Table', () => {
  it('should render', () => {
    const wrapper = mount(<Table />);
    expect(wrapper).toMatchSnapshot();
  });
});
