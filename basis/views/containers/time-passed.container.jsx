import React, {Component} from 'react';
import TimePassed from 'views/components/time-passed';

export default class TimePassedContainer extends Component {
  daysAgo(days) {
    return new Date((new Date()).getTime() - days * 1000 * 60 * 60 * 24);
  }

  render() {
    return (
      <div>
        <TimePassed time={this.daysAgo(600)}/>
        <br/>
        <TimePassed time={this.daysAgo(62)}/>
        <br/>
        <TimePassed time={this.daysAgo(7)}/>
        <br/>
        <TimePassed time={this.daysAgo(0.3)}/>
        <br/>
        <TimePassed time={this.daysAgo(0.03)}/>
        <br/>
        <TimePassed time={this.daysAgo(0.003)}/>
        <br/>
        <TimePassed time={this.daysAgo(0.0003)}/>
      </div>
    );
  }
}
