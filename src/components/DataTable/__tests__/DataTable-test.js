import React from 'react';
import DataTable, {
  Container,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '../';
import { mount } from 'enzyme';

const rows = [
  {
    id: 'a',
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    something: '80',
    rule: 'Round Robin',
    attached_groups: 'Kevins VM Groups',
    status: 'Active',
  },
  {
    id: 'b',
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    something: '80',
    rule: 'Round Robin',
    attached_groups: 'Maureens VM Groups',
    status: 'Active',
  },
  {
    id: 'c',
    name: 'Load Balancer 2',
    protocol: 'HTTP',
    something: '80',
    rule: 'Round Robin',
    attached_groups: 'Andrews VM Groups',
    status: 'Active',
  },
];

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'protocol',
    header: 'Protocol',
  },
  {
    key: 'something',
    header: 'Something',
  },
  {
    key: 'rule',
    header: 'Rule',
  },
  {
    key: 'attached_groups',
    header: 'Attached Groups',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

describe('DataTable', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      rows,
      headers,
      render: ({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getCellProps,
      }) => (
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map(cell => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ),
    };
  });

  it('should render', () => {
    const wrapper = mount(<DataTable {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
