import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import Icon from 'views/components/icon';

import './content-widget.scss';

export default class ContentWidgetHeader extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onRemove: PropTypes.func,
    // other propTypes here
  };

  static defaultProps = {
    // default propTypes here
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {
      onRemove,
      className,
      children,
      ...props,
      } = this.props;
    const componentClasses = cx('PublishingPlatformWidgetHeader', className);

    return (
      <div {...props} className={componentClasses}>
        {children}
        <Icon name="close" onClick={onRemove}/>
      </div>
    );
  }
}

