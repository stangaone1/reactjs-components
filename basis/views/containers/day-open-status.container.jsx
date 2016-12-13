import React, {Component} from 'react';

import DayOpenStatus from 'views/components/day-open-status/day-open-status';

export default class DayOpenStatusContainer extends Component {
  render() {
    const day = {name: 'Monday1', to: '20:00', from: '18:00'};
    return (<DayOpenStatus title="Monday" day={day}/>);
  }
}
