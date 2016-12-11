import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import restrictedCompare from 'lib/utils/restricted-compare';

export default class TabContent extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return restrictedCompare(this, nextProps, nextState);
  }

  render() {
    const {children, className, ...props} = this.props;
    return (
      <div className={cx('TabContent-Item', className)} role="panel" {...props}>
        {children}
      </div>
    );
  }
}
