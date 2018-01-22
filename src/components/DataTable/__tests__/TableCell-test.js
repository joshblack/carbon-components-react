import React from 'react';
import { shallow } from 'enzyme';
import { TableCell } from '../';

describe('TableCell', () => {
  it('should render', () => {
    const wrapper = shallow(<TableCell />);
    expect(wrapper).toMatchSnapshot();
  });
});
