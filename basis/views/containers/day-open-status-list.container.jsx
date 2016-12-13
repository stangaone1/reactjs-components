import React, {Component} from 'react';

import DayOpenStatusList from 'views/components/day-open-status-list';

const days = [
  {
    open24h: true,
    closed: false,
    name: 'Monday',
    from: '18:00',
    to: '20:00,',
  },
  {
    open24h: true,
    closed: false,
    name: 'Tuesday',
    from: '18:00',
    to: '20:00,',
  },
  {
    open24h: true,
    closed: false,
    name: 'Wednesday',
    from: '18:00',
    to: '20:00,',
  },
  {
    open24h: true,
    closed: false,
    name: 'Thursday',
    from: '18:00',
    to: '20:00,',
  },
  {
    open24h: true,
    closed: false,
    name: 'Friday',
    from: '18:00',
    to: '20:00,',
  },
];

export default class DayOpenStatusContainer extends Component {
  constructor() {
    super();
    this.onDaysStatusChanged = this.onDaysStatusChanged.bind(this);
    this.state = {
      days: [],
    };
  }

  componentWillMount() {
    this.setState({
      days: days,
    });
  }

  onDaysStatusChanged(days) {
    this.setState({
      days: days,
    });
  }

  render() {
    return (
      <div>
        <DayOpenStatusList onDaysStatusChanged={this.onDaysStatusChanged} days={this.state.days}/>
        <DayOpenStatusList isMultiple days={this.state.days} onDaysStatusChanged={this.onDaysStatusChanged}/>
      </div>
    );
  }
}
