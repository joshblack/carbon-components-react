import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';

const translationKeys = {
  'icon.description': 'Sort arrow',
};

const translateWithId = key => translationKeys[key];

const TableHeader = ({
  children,
  onClick,
  onKeyDown,
  isSortHeader,
  sortDirection,
  translateWithId: t,
  ...rest
}) => {
  const className = cx({
    'bx--table-sort-v2': true,
    'bx--table-sort-v2--active': isSortHeader,
    'bx--table-sort-v2--ascending': isSortHeader && sortDirection === 'ASC',
  });
  return (
    <th>
      <button
        className={className}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...rest}>
        <span className="bx--table-header-label">{children}</span>
        <Icon
          className="bx--table-sort-v2__icon"
          name="caret--down"
          description={t('icon.description')}
        />
      </button>
    </th>
  );
};

TableHeader.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  isSortHeader: PropTypes.bool.isRequired,
  sortDirection: PropTypes.oneOf(['ASC', 'DESC', null]),
  translateWithId: PropTypes.func.isRequired,
};

TableHeader.defaultProps = {
  translateWithId,
};

TableHeader.translationKeys = Object.keys(translationKeys);

export default TableHeader;
