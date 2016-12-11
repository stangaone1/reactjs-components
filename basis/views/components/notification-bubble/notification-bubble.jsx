import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import './notification-bubble.scss';

export default class NotificationBubble extends Component {
  static propTypes = {
    hidden: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.any,
    onClick: PropTypes.func,
  };
  static defaultProps = {
    hidden: false,
  };

  // show only numeric and >0 values
  renderNotificationText(notificationValue) {
    const value = parseInt(notificationValue, 10);
    return isNaN(value) || (value === 0) ? null : notificationValue;
  }

  render() {
    const {hidden,
           className,
           children,
           ...otherProps, // may receive other props like style or onClick for example
          } = this.props;
    const classNames = cx(
      'NotificationBubble',
      {
        'NotificationBubble--hidden': hidden,
        'NotificationBubble--hasClick': typeof this.props.onClick === 'function',
      },
      className,
    );

    return (
      <div {...otherProps} className={classNames}>
        {this.renderNotificationText(children)}
      </div>
    );
  }
}
