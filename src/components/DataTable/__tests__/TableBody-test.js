import React from 'react';
import { shallow } from 'enzyme';
import { TableBody } from '../';

describe('TableBody', () => {
  it('should render', () => {
    const wrapper = shallow(<TableBody />);
    expect(wrapper).toMatchSnapshot();
  });
});
