import React, {PropTypes} from 'react';
import cx from 'classnames';

import Button from './button';
import NotificationBubble from 'views/components/notification-bubble';

import './button-notification.scss';

const ButtonNotification = ({notificationCount, onNotificationClick, children, className, ...otherProps}) => {
  return (
    <div className={cx('ButtonNotification', className)}>
      <Button {...otherProps}>
        {children}
      </Button>
      <NotificationBubble onClick={onNotificationClick}>
        {notificationCount}
      </NotificationBubble>
    </div>
  );
};

ButtonNotification.propTypes = {
  className: PropTypes.string,
  notificationCount: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number]),
  onNotificationClick: PropTypes.func,
};

export default ButtonNotification;
