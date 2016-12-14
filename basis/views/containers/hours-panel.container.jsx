import React, {Component} from 'react';
import HoursPanel from 'views/components/hours-panel';

const hoursData = {
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
      day: 'Thursday',
      name: '18:00',
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
};

export default class HoursPanelContainer extends Component {

  render() {
    return (
      <HoursPanel {...hoursData} name="Set days"/>
    );
  }
}
