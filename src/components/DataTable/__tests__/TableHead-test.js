import React from 'react';
import { shallow } from 'enzyme';
import { TableHead } from '../';

describe('TableHead', () => {
  it('should render', () => {
    const wrapper = shallow(<TableHead />);
    expect(wrapper).toMatchSnapshot();
  });
});
