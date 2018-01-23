import PropTypes from 'prop-types';
import React from 'react';
import { composeEventHandlers } from './tools';
import { denormalize, normalize } from './tools/format';
import {
  getSortState,
  initialSortState,
  defaultSortRows,
  sortStates,
} from './tools/sorting';

/**
 * Data Tables are used to represent a collection of resources, displaying a
 * subset of their fields in columns, or headers. We prioritize direct updates
 * to the state of what we're rendering, so internally we end up normalizing the
 * given data and then denormalizing it when rendering.
 *
 * As a result, each part of the DataTable is accessible through look-up by id,
 * and updating the state of the single entity will cascade updates to the
 * consumer.
 */
export default class DataTable extends React.Component {
  static propTypes = {
    /**
     * The `rows` prop is where you provide us with a list of all the rows that
     * you want to render in the table. The only hard requirement is that this
     * is an array of objects, and that each object has a unique `id` field
     * available on it.
     */
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ),

    /**
     * The `headers` prop represents the order in which the headers should
     * appear in the table. You can also specify whether or not the table should
     * be sortable by this header with the `isSortable` field. If this value is
     * true, we'll provide the necessary props for sorting through the
     * `getHeaderProps` method available in the `render` method.
     */
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        isSortable: PropTypes.bool,
      })
    ).isRequired,

    /**
     * Provide an `onChange` hook where you can subscribe to internal state
     * changes of the component.
     */
    onChange: PropTypes.func,

    /**
     * Optional hook to manually control sorting of the rows. Currently, this
     * method takes in the following:
     *
     * - rowIds, an array of string ids for each row
     * - cellsById, an object where each key is a cell id
     * - direction, one of 'NONE', 'ASC', or 'DESC'
     * - key, the key for the header to sort by
     * - locale, the current locale
     *
     * And is responsible for returning an array of sorted rowIds
     */
    sortRows: PropTypes.func,

    /**
     * Provide a string for the current locale
     */
    locale: PropTypes.string,
  };

  static defaultProps = {
    sortRows: defaultSortRows,
    locale: 'en',
  };

  constructor(props) {
    super(props);

    const { rowIds, rowsById, cellsById } = normalize(
      props.rows,
      props.headers
    );
    this.state = {
      rowIds,
      rowsById,
      cellsById,

      sortDirection: initialSortState,
      sortHeader: null,

      // Copy over rowIds so the reference doesn't mutate the stored
      // `initialRowOrder`
      initialRowOrder: rowIds.slice(),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { rowIds, rowsById, cellsById } = normalize(
      nextProps.rows,
      nextProps.headers
    );
    this.setState({
      rowIds,
      rowsById,
      cellsById,
      sortDirection: initialSortState,
      sortHeader: null,
      initialRowOrder: rowIds.slice(),
    });
  }

  getHeaderProps = ({ header, onClick, ...rest }) => {
    const { key } = header;
    const { sortDirection, sortHeader } = this.state;
    return {
      ...rest,
      key,
      isSortHeader: sortHeader === key,
      sortDirection,
      // No need to include `onKeyDown` here since the underlying element
      // is a button
      onClick: composeEventHandlers([this.handleSortBy(key), onClick]),
    };
  };

  handleSortBy = key => () => {
    this.setState(state => {
      const {
        rowIds,
        cellsById,
        sortDirection,
        sortHeader,
        initialRowOrder,
      } = state;
      const { locale, sortRows } = this.props;
      const nextSortDirection = getSortState(key, sortHeader, sortDirection);
      const nextRowIds =
        nextSortDirection !== sortStates.NONE
          ? sortRows({
              rowIds: rowIds.slice(),
              cellsById,
              direction: sortDirection,
              key,
              locale,
            })
          : initialRowOrder;
      return {
        sortHeader: key,
        sortDirection: nextSortDirection,
        rowIds: nextRowIds,
      };
    });
  };

  getRowProps = ({ row }) => ({
    key: row.id,
  });

  getCellProps = ({ cell }) => ({
    key: cell.id,
  });

  render() {
    const { children, render } = this.props;
    const { rowIds, rowsById, cellsById } = this.state;
    const renderProps = {
      rows: denormalize(rowIds, rowsById, cellsById),
      headers: this.props.headers,
      getHeaderProps: this.getHeaderProps,
      getRowProps: this.getRowProps,
      getCellProps: this.getCellProps,
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
