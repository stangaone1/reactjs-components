import React, {Component, PropTypes} from 'react';

import CalendarButton from 'views/components/calendar-button';

export default class CalendarButtonContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: void 0,
    };
  }

  handleChange(newDate) {
    this.setState({
      value: newDate,
    });
  }

  render() {
    const containerStyle = {
      width: 500,
      height: 500,
      margin: '20px 20px 10px 20px',
      padding: '1px 60px 20px 60px',
      background: 'white',
      boxShadow: '2px 2px 8px -3px gray',
      borderRadius: '10px',
    };

    return (
      <div style={containerStyle}>
        <h3>Button date picker - <code>{'<CalendarButton>'}</code></h3>
        <CalendarButton
          onChange={this.handleChange.bind(this)}
          value={this.state.value}
        />
        <br />
        <br />
        {`Selected date: ${this.state.value}`}
      </div>
    );
  }
}

CalendarButtonContainer.displayName = 'CalendarButtonContainerContainer';
CalendarButtonContainer.propTypes = {
  calendarButton: PropTypes.object,
  dispatch: PropTypes.func,
  actions: PropTypes.object,
};
