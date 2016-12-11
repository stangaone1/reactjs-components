import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import Icon from 'views/components/icon';
import './notification.scss';

export default class Notification extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['info', 'warning', 'success']),
    hidden: PropTypes.bool,
    children: PropTypes.string,
    className: PropTypes.string,

    hasClose: PropTypes.bool,
    onCloseClick: PropTypes.func,
  };

  static defaultProps = {
    type: 'info',
    hidden: false,

    hasClose: true,
    onCloseClick: () => {},
  };

  renderCloseButton() {
    const { onCloseClick } = this.props;

    return (
      <Icon
        className="Notification-close"
         name="close"
         onClick={onCloseClick}
      />
    );
  }

  renderNotification() {
    const {type,
           hidden,
           hasClose,
           onCloseClick,
           className,
           ...otherProps} = this.props;

    const classNames = cx(
      className,
      'Notification',
      'Notification--' + type,
    );

    const closeButton = hasClose ? this.renderCloseButton() : null;

    if (hidden) return null;
    return (
      <div className={classNames}>
        <Icon className="Notification-icon" name={'notification.' + type} />
          <span className="Notification-text">{this.props.children}</span>
        {closeButton}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderNotification()}
      </div>
    );
  }
}
