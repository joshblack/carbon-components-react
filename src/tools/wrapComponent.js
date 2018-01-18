import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const wrapComponent = ({ name, className, type }) => {
  const Component = props => {
    return <type {...props} className={cx(className, props.className)} />;
  };
  Component.displayName = name;
  Component.propTypes = {
    className: PropTypes.string,
  };
  return Component;
};

export default wrapComponent;
