import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import {isString} from 'lodash';

import './button.scss';

export default class Button extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['main', 'dropdown', 'submit', 'link', 'primary', 'transparent']),
    size: PropTypes.oneOf(['small']),
    buttonType: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    centered: PropTypes.bool,
    block: PropTypes.bool,
    opened: PropTypes.bool,
    onClick: PropTypes.func,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  renderChildren(children) {
    // default text for button
    return children === undefined || (isString(children) && children.trim() === '')
      ? 'Button'
      : children;
  }

  render() {
    const {
      type,
      size,
      selected,
      centered,
      block,
      disabled,
      opened,
      className,
      buttonType,
      ...otherProps } = this.props;

    // button classes for types and modifiers
    const buttonClasses = cx('Button', {
      ['Button--' + type]: type,
      ['Button--' + size]: size,
      'Button--opened': type === 'dropdown' && opened,
      'Button--selected': selected,
      'Button--centered': centered,
      'Button--block': block,
      'Button--disabled': disabled,
    }, className);

    // change onClick if button is disabled
    if (disabled) {
      delete otherProps.onClick;
    }

    return (
      <button {...otherProps} className={buttonClasses} type={buttonType}>
        {this.renderChildren(this.props.children)}
      </button>
    );
  }
}
