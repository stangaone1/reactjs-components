import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import './content-widget.scss';

export default class ContentWidgetContent extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {
      className,
      children,
      ...props,
      } = this.props;

    const componentClasses = cx('PublishingPlatformWidgetContent', className);

    return (
      <div {...props} className={componentClasses}>
        {children}
      </div>
    );
  }
}

