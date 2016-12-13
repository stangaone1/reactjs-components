import React, {Component} from 'react';
import Notification from 'views/components/notification';
import {Button} from 'views/components/buttons';

export default class NotificationContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      warningNotificationHidden: false,
      infoNotificationHidden: false,
      successNotificationHidden: false,
      tempNotificationHidden: true,
    };
  }

  // get notification name and close it in state
  _close(notification) {
    this.setState({[`${notification}Hidden`]: true});
  }

  _show() {
    this.setState({'tempNotificationHidden': false});
    setTimeout(() => {
      this.setState({'tempNotificationHidden': true});
    }, 2000);
  }

  render() {
    const divStyle = {
      width: '400px',
      border: '1px solid gray',
      padding: '10px',
    };

    return (
      <div style={divStyle}>
        <Notification type="warning"
                      onCloseClick={this._close.bind(this, 'warningNotification')}
                      hidden={this.state.warningNotificationHidden}>
          This is a warning message
        </Notification>
        <Notification type="info"
                      onCloseClick={this._close.bind(this, 'infoNotification')}
                      hidden={this.state.infoNotificationHidden}
                      block>
          This is a BLOCK info notification
        </Notification>
        <Notification type="success"
                      onCloseClick={this._close.bind(this, 'successNotification')}
                      hidden={this.state.successNotificationHidden}>
          Your action completed successfuly
        </Notification>
        <br /><br /><br />
        <Notification type="success"
                      onCloseClick={this._close.bind(this, 'tempNotification')}
                      hidden={this.state.tempNotificationHidden}>
          Your action completed successfuly
        </Notification>
        <Button onClick={this._show.bind(this)}>
          Show notification
        </Button>
      </div>
    );
  }
}
