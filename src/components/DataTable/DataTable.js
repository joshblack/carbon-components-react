import PropTypes from 'prop-types';
import React from 'react';
import Checkbox from '../Checkbox';
import { composeEventHandlers } from './tools';
import { denormalize, normalize } from './tools/format';
import {
  getSortState,
  initialSortState,
  defaultSortRows,
  sortStates,
} from './tools/sorting';
import InlineCheckbox from '../InlineCheckbox';

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

    /**
     * Specify whether row-level selection is available
     */
    isSelectable: PropTypes.bool,

    /**
     * Specify whether row-level expansion is available
     */
    isExpandable: PropTypes.bool,
  };

  static defaultProps = {
    sortRows: defaultSortRows,
    locale: 'en',
    isSelectable: false,
    isExpandable: false,
  };

  constructor(props) {
    super(props);

    const { rowIds, rowsById, cellsById } = normalize(
      props.rows,
      props.headers,
      props.isSelectable
    );
    this.state = {
      rowIds,
      rowsById,
      cellsById,

      // Sorting
      sortDirection: initialSortState,
      sortHeader: null,

      // InlineCheckbox
      selectedRows: [],

      // Copy over rowIds so the reference doesn't mutate the stored
      // `initialRowOrder`
      initialRowOrder: rowIds.slice(),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { rowIds, rowsById, cellsById } = normalize(
      nextProps.rows,
      nextProps.headers,
      nextProps.isSelectable
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
    if (header.isSelectionHeader) {
      return {
        ...rest,
        key: '__data-table_selection__',
        shouldUseElement: true,
        onClick,
      };
    }

    if (header.isExpansionHeader) {
      return {
        ...rest,
        key: '__data-table_expansion__',
        shouldUseElement: true,
      };
    }

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

  getRowProps = ({ row, isExpandedRow, isExpandable, ...rest }) => {
    if (isExpandable) {
      return {
        key: row.id,
        isSelectable: false,
        isExpanded: row.isExpanded,
        isExpandable: true,
        onExpand: this.handleOnExpand(row.id),
      };
    }

    if (isExpandedRow) {
      return {
        key: `${row.id}-expanded`,
        isExpanded: row.isExpanded,
      };
    }

    return {
      key: row.id,
      isSelected: row.isSelected,
      isSelectable: row.isSelectable,
      onSelection: this.handleOnSelect(row.id),
    };
  };

  getCellProps = ({ cell, ...rest }) => ({
    key: cell.id,
    ...rest,
  });

  getSelectableHeader = () => {
    const { selectedRows, rowIds } = this.state;
    const isChecked = this.getSelectedRows().length === rowIds.length;
    return {
      isInlineCheckboxHeader: true,
      header: (
        <InlineCheckbox
          id="data-table_select-all"
          name="select-all"
          onClick={this.handleSelectAll}
          checked={isChecked}
        />
      ),
    };
  };

  getSelectedRows = () =>
    Object.keys(this.state.rowsById).filter(
      key =>
        this.state.rowsById[key].isSelectable &&
        this.state.rowsById[key].isSelected
    );

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

  handleSelectAll = () => {
    const { rowIds } = this.state;
    const isSelected = this.getSelectedRows().length !== rowIds.length;

    this.setState(state => ({
      rowsById: Object.keys(state.rowsById).reduce(
        (acc, key) => ({
          ...acc,
          [key]: {
            ...state.rowsById[key],
            isSelected,
          },
        }),
        {}
      ),
    }));
  };

  handleOnSelect = rowId => () => {
    this.setState(state => {
      const { rowsById } = state;
      const row = rowsById[rowId];
      return {
        rowsById: {
          ...rowsById,
          [rowId]: {
            ...row,
            isSelected: row.isSelectable && !row.isSelected,
          },
        },
      };
    });
  };

  handleOnExpand = id => () => {
    this.setState(state => {
      const { rowsById } = state;
      const row = rowsById[id];
      console.log(row);
      return {
        rowsById: {
          ...rowsById,
          [id]: {
            ...row,
            isExpanded: !row.isExpanded,
          },
        },
      };
    });
  };

  getHeaders = () => {
    const { headers, isSelectable, isExpandable } = this.props;
    if (isSelectable) {
      return [this.getSelectableHeader(), ...this.props.headers];
    }
    if (isExpandable) {
      return [
        {
          isExpansionHeader: true,
          header: '',
        },
        ...this.props.headers,
      ];
    }
    return headers;
  };

  render() {
    const { children, render, isSelectable } = this.props;
    const { rowIds, rowsById, cellsById } = this.state;
    const renderProps = {
      rows: denormalize(rowIds, rowsById, cellsById),
      headers: this.getHeaders(),
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
