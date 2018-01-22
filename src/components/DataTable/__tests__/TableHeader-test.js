import React from 'react';
import { shallow } from 'enzyme';
import { TableHeader } from '../';

describe('TableHeader', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      children: <div />,
      onClick: jest.fn(),
      onKeyDown: jest.fn(),
      isSortHeader: false,
      sortDirection: null,
    };
  });

  it('should render', () => {
    const wrapper = shallow(<TableHeader {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render when it is sorting', () => {
    const wrapper = shallow(
      <TableHeader {...mockProps} isSortHeader={true} sortDirection="ASC" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support translations', () => {
    expect(TableHeader.translationKeys).toBeDefined();
    const mockTranslateWithId = jest.fn(() => 'hi');
    const wrapper = shallow(
      <TableHeader {...mockProps} translateWithId={mockTranslateWithId} />
    );
    expect(mockTranslateWithId).toHaveBeenCalled();
    expect(mockTranslateWithId).toHaveBeenCalledWith(
      TableHeader.translationKeys[0]
    );
  });
});
