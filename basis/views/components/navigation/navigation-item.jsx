import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { navigationNotifications as paths } from 'config';
import NotificationBubble from 'views/components/notification-bubble';
import cx from 'classnames';
import {includes} from 'lodash';

export default class NavigationItem extends Component {
  static propTypes = {
    link: PropTypes.string,
    name: PropTypes.string,
    notifications: PropTypes.object,
    router: PropTypes.object,
    complete: PropTypes.bool,
  }

  static defaultProps = {
    notifications: {},
  }

  hasNotifications(link) {
    return paths.hasOwnProperty(link) && this.props.notifications.hasOwnProperty(paths[link]);
  }

  renderLinkNotification(link) {
    if (!this.hasNotifications(link)) {
      return null;
    }

    const value = this.props.notifications[paths[link]];

    return (
      <NotificationBubble>
        {value}
      </NotificationBubble>
    );
  }

  render() {
    const {link, name} = this.props;
    const {pathname} = this.props.router.location;
    const itemClass = cx({
      'MainNav-item': true,
      'MainNav-item--complete': this.props.complete,
      'MainNav-item--incomplete': this.props.complete === false,
    });
    if (link) {
      const correctLink = link.split('?')[0];

      return (
        <Link
          activeClassName={includes(pathname, correctLink) ? 'MainNav-item--active' : ''}
          className={itemClass}
          to={correctLink}
        >
          {name}
          {this.renderLinkNotification(link)}
        </Link>
      );
    }

    return (
      <span className="MainNav-item">
        {name}
      </span>
    );
  }
}
