import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

import compareProps from 'lib/utils/compare-keys';

export default class SelectOption extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    selected: PropTypes.bool,
    focused: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps) {
    return compareProps(nextProps, this.props, [
      'selected',
      'focused',
      'children',
    ]);
  }

  render() {
    const {selected, focused, disabled, children, className, ...props} = this.props;
    const optionClasses = cx('Select-Option', {
      'Select-Option--selected': selected,
      'Select-Option--focused': focused,
      'Select-Option--disabled': disabled,
    }, className);

    return (
      <li
        className={optionClasses}
        {...props}
      >
        {children}
      </li>
    );
  }
}
