import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import './time-passed.scss';

export default class TimePassed extends Component {
  static propTypes = {
    time: PropTypes.number,
  };

  render() {
    const dayDiff = moment(this.props.time).toNow(true);
    return (
      <span className="TimePassed">
         {dayDiff} ago
      </span>
    );
  }
}
