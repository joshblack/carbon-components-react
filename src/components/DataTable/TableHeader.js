import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import { sortStates } from './tools/sorting';

const translationKeys = {
  'icon.description': 'Sort arrow',
};

const translateWithId = key => translationKeys[key];

const TableHeader = ({
  children,
  onClick,
  isSortHeader,
  shouldUseElement,
  sortDirection,
  translateWithId: t,
  ...rest
}) => {
  if (shouldUseElement) {
    return <th {...rest}>{children}</th>;
  }

  const className = cx({
    'bx--table-sort-v2': true,
    'bx--table-sort-v2--active':
      isSortHeader && sortDirection !== sortStates.NONE,
    'bx--table-sort-v2--ascending':
      isSortHeader && sortDirection === sortStates.ASC,
  });
  return (
    <th>
      <button className={className} onClick={onClick} {...rest}>
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
  onClick: PropTypes.func,
  isSortHeader: PropTypes.bool,
  sortDirection: PropTypes.oneOf(['ASC', 'DESC', 'NONE']),
  translateWithId: PropTypes.func,
};

TableHeader.defaultProps = {
  translateWithId,
};

TableHeader.translationKeys = Object.keys(translationKeys);

export default TableHeader;
