import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import restrictedCompare from 'lib/utils/restricted-compare';

export default class Tab extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    selected: false,
    disabled: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return restrictedCompare(this, nextProps, nextState);
  }

  render() {
    const {
      className,
      disabled,
      selected,
      title,
      children,
      ...props} = this.props;

    const tabClasses = cx('Tab-Item', {
      'Tab-Item--selected': disabled ? false : selected,
      'Tab-Item--disabled': disabled,
    }, className);

    return (
        <li role="tab" className={tabClasses} {...props}>
          <a href="#">{children || title}</a>
        </li>
    );
  }
}
