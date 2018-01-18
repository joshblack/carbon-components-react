import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import DataTable, {
  Container,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '../DataTable';
import PaginationV2 from '../PaginationV2';
import Button from '../Button';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';

const paginationProps = {
  pageSizes: [10, 20, 30, 40, 50],
};

const initialRows = [
  {
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    something: '80',
    rule: 'Round Robin',
    attached_groups: 'Kevins VM Groups',
    status: 'Active',
  },
  {
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    something: '80',
    rule: 'Round Robin',
    attached_groups: 'Maureens VM Groups',
    status: 'Active',
  },
  {
    name: 'Load Balancer 2',
    protocol: 'HTTP',
    something: '80',
    rule: 'Round Robin',
    attached_groups: 'Andrews VM Groups',
    status: 'Active',
  },
];

const headers = Object.keys(initialRows[0]).map(key => ({
  key,
  header: key.charAt(0).toUpperCase() + key.substring(1),
}));

console.log(initialRows);
console.log(headers);

storiesOf('DataTable', module).addWithInfo(
  'Data Table',
  `
      Data table
    `,
  () => (
    <DataTable
      rows={initialRows}
      headers={headers}
      render={({
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
                  {header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                {Object.keys(row).map(key => (
                  <TableCell key={key}>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    />
  )
);
// .addWithInfo(
// 'Expandable table',
// `
// Expandable table
// `,
// () => <ExpandableDataTable />
// );
