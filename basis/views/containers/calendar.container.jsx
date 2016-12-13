import React, {Component} from 'react';
import Calendar from 'views/components/calendar';

export default class CalendarContainer extends Component {
  render() {
    const containerStyle = {
      width: 470,
      height: 500,
      margin: '20px 20px 10px 20px',
      padding: '1px 60px 20px 60px',
      background: 'white',
      boxShadow: '2px 2px 8px -3px gray',
      borderRadius: '10px',
    };
    return (
      <div style={containerStyle}>
        <h3>Date picker component - <code>{'<Calendar>'}</code></h3>
        <Calendar minDate="2015-11-10" visible={false} />
      </div>
    );
  }
}
