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

storiesOf('DataTable', module).addWithInfo(
  'default',
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
);
// .addWithInfo(
// 'selectable',
// `
// Selectable Table
// `,
// () => (
// <DataTable
// rows={initialRows}
// headers={headers}
// isSelectable={true}
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
// {headers.map(header => (
// <TableHeader {...getHeaderProps({ header })}>
// {header.header}
// </TableHeader>
// ))}
// </TableRow>
// </TableHead>
// <TableBody>
// {rows.map(row => (
// <TableRow {...getRowProps({ row })}>
// {row.cells.map(cell => (
// <TableCell {...getCellProps({ cell })}>
// {cell.value}
// </TableCell>
// ))}
// </TableRow>
// ))}
// </TableBody>
// </Table>
// )}
// />
// )
// )
// .addWithInfo(
// 'expandable',
// `
// Expandable Table
// `,
// () => (
// <DataTable
// rows={initialRows}
// headers={headers}
// isExpandable
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
// {headers.map(header => (
// <TableHeader {...getHeaderProps({ header })}>
// {header.header}
// </TableHeader>
// ))}
// </TableRow>
// </TableHead>
// <TableBody>
// {rows.map(row => (
// <React.Fragment key={row.id}>
// <TableRow {...getRowProps({ row, isExpandable: true })}>
// {row.cells.map(cell => (
// <TableCell {...getCellProps({ cell })}>
// {cell.value}
// </TableCell>
// ))}
// </TableRow>
// <TableRow {...getRowProps({ row, isExpandedRow: true })}>
// <TableCell colSpan={headers.length}>
// <div>
// <h1>Expandable Row Content</h1>
// <p>Description here.</p>
// </div>
// </TableCell>
// </TableRow>
// </React.Fragment>
// ))}
// </TableBody>
// </Table>
// )}
// />
// )
// );
