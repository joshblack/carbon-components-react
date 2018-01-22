import React from 'react';
import { shallow } from 'enzyme';
import { TableRow } from '../';

describe('TableRow', () => {
  it('should render', () => {
    const wrapper = shallow(<TableRow />);
    expect(wrapper).toMatchSnapshot();
  });
});
