import React, {Component} from 'react';
import NotificationBubble from 'views/components/notification-bubble';
import {ButtonGroup, Button, ButtonNotification} from 'views/components/buttons';

export default class NotificationBubbleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationCount: 10,
      buttonNotificationCount: 8,
    };
  }

  decrementNotificationCount() {
    const currentCount = this.state.notificationCount;
    if (currentCount > 0) {
      this.setState({notificationCount: currentCount - 1});
    }
  }

  dismissNotification() {
    this.setState({notificationCount: 0});
  }

  dismissButtonNotification() {
    this.setState({buttonNotificationCount: 0});
  }

  render() {
    const style = {
      position: 'relative',
      backgroundColor: 'white',
      border: '1px solid black',
      width: 550,
      padding: 30,
      marginBottom: 30,
    };
    return (
      <div>
        <div style={style}>
          <h4>Notiffication bubble (only shows for >0 values); click to dismiss</h4>
          <br /><br />
          <NotificationBubble onClick={this.dismissNotification.bind(this)}>
            {this.state.notificationCount}
          </NotificationBubble>
          <Button onClick={this.decrementNotificationCount.bind(this)}>
            Decrement notiffication
          </Button>
        </div>
        <div style={style}>
          <h4>Button notiffication (click on notification to dismiss)</h4>
          <ButtonNotification
            notificationCount={this.state.buttonNotificationCount}
            onNotificationClick={this.dismissButtonNotification.bind(this)}
          >
            Notiffication Button
          </ButtonNotification>
        </div>
        <div style={style}>
          <h3>Button group notiffications</h3>
          <h4>First</h4>
          <ButtonGroup buttonsType="dropdown">
            <ButtonNotification notificationCount="8">
              Notiffication
            </ButtonNotification>
            <Button />
            <Button />
          </ButtonGroup>
          <br /><br />
          <h4>Middle</h4>
          <ButtonGroup buttonsType="dropdown">
            <Button />
            <ButtonNotification notificationCount="8">
              Notiffication
            </ButtonNotification>
            <Button />
          </ButtonGroup>
          <br /><br />
          <h4>Last</h4>
          <ButtonGroup buttonsType="dropdown">
            <Button />
            <Button />
            <ButtonNotification notificationCount="8">
              Notiffication
            </ButtonNotification>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
