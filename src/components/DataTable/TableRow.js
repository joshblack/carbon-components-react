import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import InlineCheckbox from '../InlineCheckbox';
import TableCell from './TableCell';

const TableRow = ({
  id,
  isSelectable,
  isSelected,
  onSelection,
  isExpanded,
  isExpandable,
  onExpand,
  children,
  ...rest
}) => {
  if (isExpandable) {
    const className = cx({
      'bx--parent-row-v2': true,
      'bx--expandable-row-v2': isExpanded,
    });
    const previousValue = isExpanded ? 'collapsed' : undefined;
    return (
      <tr className={className} data-parent-row>
        <TableCell
          className="bx--table-expand-v2"
          data-previous-value={previousValue}>
          <button className="bx--table-expand-v2__button" onClick={onExpand}>
            <Icon className="bx--table-expand-v2__svg" name="chevron--right" />
          </button>
        </TableCell>
        {children}
      </tr>
    );
  }

  if (typeof isExpanded !== 'undefined') {
    if (isExpanded) {
      return (
        <tr {...rest} className="bx--expandable-row-v2" data-child-row>
          {children}
        </tr>
      );
    }
    return null;
  }

  if (isSelectable) {
    return (
      <tr {...rest}>
        <TableCell>
          <InlineCheckbox
            id={`select-row-${id}`}
            name={`select-row-${id}`}
            checked={isSelected}
            onClick={onSelection}
          />
        </TableCell>
        {children}
      </tr>
    );
  }
  return <tr {...rest}>{children}</tr>;
};

TableRow.propTypes = {
  isSelectable: PropTypes.bool,
  isSelected: PropTypes.bool,
  children: PropTypes.node,
};

TableRow.defaultProps = {
  isSelectable: false,
  isSelected: false,
};

export default TableRow;
