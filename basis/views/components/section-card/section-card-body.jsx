import React, {PropTypes} from 'react';
import Icon from 'views/components/icon';
import './section-card-body.scss';

const SectionCardBody = (props)=> {
  let NotificationsContainer;
  const {content, notifications, children} = props;
  if (notifications && notifications.length) {
    const notificationsElements = notifications.map((notification, index)=> {
      const {iconName, title, content} = notification;
      let topElement;
      if (iconName) {
        topElement = (<Icon name={notification.iconName}/>);
      }
      if (title) {
        topElement = (<div className="SectionCardNotification-title">{title}</div>);
      }

      const contentClass = typeof content === 'string' || 'number' ? 'SectionCardNotification-content' : null;
      return (
        <div key={`Notification-${index}`} className="SectionCardNotification">
          {topElement}
          <div className={contentClass}>{content}</div>
        </div>
      );
    });

    NotificationsContainer = (<div className="SectionCardNotifications">{notificationsElements}</div>);
  }

  return (
    <div className="SectionCardBody">
      <div className="SectionCardBody-content">
        {content}
      </div>
      {NotificationsContainer}
      {children}
    </div>
  );
};

SectionCardBody.displayName = 'SectionCardBody';
SectionCardBody.propTypes = {
  content: PropTypes.string,
  notifications: PropTypes.array,
  children: PropTypes.node,
};
SectionCardBody.defaultProps = {};

export default SectionCardBody;
