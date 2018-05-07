import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import FloatingMenu from '../../internal/FloatingMenu';
import EditCellActions from './EditCellActions';

export default class EditCellField extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['text']).isRequired,
    value: PropTypes.string.isRequired,
  };

  render() {
    const {
      error,
      disabled,
      id,
      labelText,
      onCancel,
      onChange,
      onSave,
      type,
      value,
    } = this.props;
    const className = cx({
      'bx--data-table__edit-field': true,
      'bx--data-table__edit-field--error': error,
    });
    const inputProps = {
      className: 'bx--text-input',
      disabled,
      id,
      type,
      value,
      onChange,
    };
    const errorNodeId = `${id}_error`;

    if (error) {
      inputProps['aria-describedby'] = errorNodeId;
    }

    return (
      <React.Fragment>
        <div className={className}>
          <label className="bx--label" htmlFor={id}>
            {labelText}
          </label>
          <input {...inputProps} />
        </div>
        {error && (
          <div className="bx--data-table__edit-status">
            <div
              className="bx--data-table__status--error"
              role="alert"
              tabIndex="0"
              aria-describedby={errorNodeId}>
              <Icon
                className="bx--data-table__icon--error"
                name="error--glyph"
                title={error}
                description={error}
                aria-hidden
              />
              <span id={errorNodeId} className="bx--data-table__error-text">
                {error}
              </span>
            </div>
          </div>
        )}
        {!disabled && <EditCellActions onSave={onSave} onCancel={onCancel} />}
      </React.Fragment>
    );
  }
}
