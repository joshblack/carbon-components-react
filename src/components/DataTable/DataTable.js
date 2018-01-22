import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
import Search from '../Search';
import { sortRow, toggleSortDirection } from './tools/sorting';

// TODO: pre-sorted by column
export default class DataTable extends React.Component {
  static propTypes = {
    row: PropTypes.array.isRequired,
    headers: PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    // TODO: sort rows by active header
    this.state = {
      rows: props.rows.slice(),
      sortDirection: null,
      sortHeader: null,
      sortHistory: [],
      sortLookup: props.headers.reduce(
        (acc, { key, header }) => ({
          ...acc,
          [header]: key,
        }),
        {}
      ),
    };
  }

  componentWillReceiveProps(nextProps) {
    // TODO: sync incoming rows/headers with state
  }

  sortBy = header => () =>
    this.setState(state => {
      const { rows, sortDirection, sortLookup } = state;
      const key = sortLookup[header];

      return {
        rows: rows.sort(sortRow(key, sortDirection, 'en')),
        sortDirection: toggleSortDirection(sortDirection),
        sortHeader: header,
      };
    });

  getHeaderProps = ({ header }) => ({
    isSortHeader: this.state.sortLookup[header] === this.state.sortHeader,
    key: header,
    onClick: this.sortBy(header),
    onKeyDown: this.handleOnKeyDown(this.sortBy(header)),
    sortDirection: this.state.sortDirection,
  });

  handleOnKeyDown = handler => event => {
    if (event.keyCode === 32 || event.keyCode === 13) {
      handler();
    }
  };

  render() {
    const { children, render } = this.props;
    const renderProps = {
      rows: this.state.rows,
      headers: this.props.headers,

      getHeaderProps: this.getHeaderProps,
    };

    if (render !== undefined) {
      return render(renderProps);
    }

    if (children !== undefined) {
      return children(renderProps);
    }

    return null;
  }
}
