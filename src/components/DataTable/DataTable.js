import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
import Search from '../Search';
import { sortRow, toggleSortDirection } from './tools/sorting';
import wrapComponent from '../../tools/wrapComponent';

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
    };
  }

  componentWillReceiveProps(nextProps) {
    // TODO: sync incoming rows/headers with state
  }

  sortBy = header => () =>
    this.setState(state => {
      const { key } = this.props.headers.find(h => h.header === header);
      const sortDirection = toggleSortDirection(state.sortDirection);
      const rows = state.rows.sort(sortRow(key, sortDirection, 'en'));

      return {
        rows,
        sortDirection,
        sortHeader: header,
      };
    });

  getHeaderProps = ({ header }) => ({
    isSortHeader: header === this.state.sortHeader,
    key: header,
    onClick: this.sortBy(header),
    onKeyDown: event => {
      if (event.keyCode === 32 || event.keyCode === 13) {
        this.sortBy(header);
      }
    },
    sortDirection: this.state.sortDirection,
  });

  render() {
    const { children, render } = this.props;
    const renderProps = {
      rows: this.state.rows,
      headers: this.props.headers.map(({ header }) => header),

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
