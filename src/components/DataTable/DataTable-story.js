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

const rows = [[{ name: 'Load Bala' }]];

const initialRows = [
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
    isSortable: true,
  },
  {
    key: 'protocol',
    header: 'Protocol',
    isSortable: true,
  },
  {
    key: 'something',
    header: 'Something',
    isSortable: false,
  },
  {
    key: 'rule',
    header: 'Rule',
    isSortable: false,
  },
  {
    key: 'attached_groups',
    header: 'Attached Groups',
    isSortable: true,
  },
  {
    key: 'status',
    header: 'Status',
    isSortable: true,
  },
];

storiesOf('DataTable', module).addWithInfo(
  'Data Table',
  `
    Data table
  `,
  () => (
    <DataTable
      rows={initialRows}
      headers={headers}
      render={({ rows, headers, getHeaderProps }) => (
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
              <TableRow key={row.id}>
                {row.cells.map(cell => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    />
  )
  // () => (
  // <DataTable
  // rows={initialRows}
  // headers={headers}
  // render={({
  // rows,
  // headers,

  // getHeaderProps,
  // getRowProps,
  // getCellProps,
  // }) => (
  // <Table>
  // <TableHead>
  // <TableRow>
  // {headers.map(({ header }) => (
  // <TableHeader {...getHeaderProps({ header })}>
  // {header}
  // </TableHeader>
  // ))}
  // </TableRow>
  // </TableHead>
  // <TableBody>
  // {rows.map((row, i) => (
  // <TableRow key={i}>
  // {Object.keys(row).map(key => (
  // <TableCell key={key}>{row[key]}</TableCell>
  // ))}
  // </TableRow>
  // ))}
  // </TableBody>
  // </Table>
  // )}
  // />
  // )
);
// .addWithInfo(
// 'Expandable table',
// `
// Expandable table
// `,
// () => <ExpandableDataTable />
// );
