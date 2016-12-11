import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import './switch-button.scss';

export default class SwitchButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    leftLabel: PropTypes.string,
    rightLabel: PropTypes.string,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  renderLeftLabel() {
    const {leftLabel, checked} = this.props;
    const className = {
      'SwitchButton-leftText': true,
      'SwitchButton-rightText--inactive': checked,
    };
    if (leftLabel) {
      return (
        <div className={cx(className)}>{leftLabel}</div>
      );
    }
  }

  renderRightLabel() {
    const {rightLabel, checked} = this.props;
    const className = {
      'SwitchButton-rightText': true,
      'SwitchButton-rightText--inactive': !checked,
    };
    if (rightLabel) {
      return (
        <div className={cx(className)}>{rightLabel}</div>
      );
    }
  }

  render() {
    const {className, checked, disabled, onChange, ...props} = this.props;
    const componentClasses = cx('SwitchButton', className);

    const toggleClasses = cx('SwitchButton-toggle', {
      'SwitchButton-toggle--checked': checked,
      'SwitchButton-toggle--disabled': disabled,
    });

    return (
      <div className={componentClasses}>
        {this.renderLeftLabel()}
        <div
          {...props}
          className={toggleClasses}
          onClick={onChange}
        >
          <div className="SwitchButton-toggleButton"></div>
        </div>
        {this.renderRightLabel()}
      </div>
    );
  }
}

