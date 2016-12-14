import React, {Component} from 'react';

import HoursPanelList from 'views/components/hours-panel-list';

const HOURS = [
  {
    categoryName: 'weekdays',
    sameProgram: true,
    days: [
      {
        open24h: true,
        closed: false,
        name: 'Monday',
        from: '18:00',
        to: '20:00',
      },
      {
        open24h: true,
        closed: false,
        name: 'Tuesday',
        from: '18:00',
        to: '20:00',
      },
      {
        open24h: true,
        closed: false,
        name: 'Wednesday',
        from: '18:00',
        to: '20:00',
      },
      {
        open24h: true,
        closed: false,
        name: 'Thursday',
        from: '18:00',
        to: '20:00',
      },
      {
        open24h: true,
        closed: false,
        name: 'Friday',
        from: '18:00',
        to: '20:00',
      },
    ],
  },
  {
    categoryName: 'weekends',
    sameProgram: false,
    days: [
      {
        open24h: true,
        closed: false,
        name: 'Saturday',
        from: '07:00',
        to: '20:00',
      },
      {
        open24h: false,
        closed: true,
        name: 'Sunday',
        from: '9:00',
        to: '10:00',
      },
    ],
  },
];

export default class HoursPanelListContainer extends Component {
  onHoursChanged(hours) {
    console.log('HOURS CHANGED', hours);
  }

  render() {
    console.log('HOURS', HOURS);
    return (<HoursPanelList onHoursChanged={this.onHoursChanged.bind(this)} hours={HOURS}/>);
  }
}
