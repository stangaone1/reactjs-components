import React, {Component} from 'react';
import TimeSelect from 'views/components/time-select';

export default class TimeSelectContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentTime: '18:00',
    };
  }

  onTimeChange(time) {
    this.setState({currentTime: time});
  }

  render() {
    return (
      <div>
        <TimeSelect time={this.state.currentTime} onChange={this.onTimeChange.bind(this)} />

        <div>{'the time selected is: ' + this.state.currentTime}</div>
      </div>
    );
  }
}
