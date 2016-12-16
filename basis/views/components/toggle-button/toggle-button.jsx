import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import './toggle-button.scss';

export default class ToggleButton extends Component {

  render() {
    const {checked,
           className,
           disabled,
           onClick,
           ...otherProps, // other props passed from parent (like refs etc.)
          } = this.props;
    const toggleButtonClasses = cx(
      className,
      'ToggleButton',
      {'ToggleButton--checked': checked},
      {'disabled': disabled}
    );
    return (
      <div {...otherProps}
           className={toggleButtonClasses}
           onClick={onClick}>
        <div className="ToggleButton-toggler" />
      </div>
    );
  }
}

ToggleButton.displayName = 'ToggleButton';
ToggleButton.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
ToggleButton.defaultProps = {
  checked: false,
};
