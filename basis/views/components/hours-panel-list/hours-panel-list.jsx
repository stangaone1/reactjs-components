import React, {Component, PropTypes} from 'react';
import {findIndex, cloneDeep} from 'lodash';

import HoursPanel from 'views/components/hours-panel';

export default class HoursPanelList extends Component {
  static propTypes = {
    hours: PropTypes.array.isRequired,
    name: PropTypes.string,
    onHoursChanged: PropTypes.func,
    hoursTitle: PropTypes.any,
    renderOpenButtons: PropTypes.bool,
  };

  static defaultProps = {
    hours: [],
  };

  constructor() {
    super();
    this.onHoursChanged = this.onHoursChanged.bind(this);
  }

  onHoursChanged(newHours) {
    const newHoursList = cloneDeep(this.props.hours);
    const changedHoursIndex = findIndex(newHoursList, hour => hour.type === newHours.type);
    newHoursList[changedHoursIndex] = newHours;
    if (this.props.onHoursChanged) {
      this.props.onHoursChanged(newHoursList);
    }
  }

  renderHours(hours) {
    const renderOpenButtons = this.props.renderOpenButtons !== null ? this.props.renderOpenButtons : true;
    return hours.map((hour, index)=> {
      return (<HoursPanel
        key={index}
        onHoursChanged={this.onHoursChanged}
        hoursTitle={this.props.hoursTitle}
        renderOpenButtons={renderOpenButtons}
        name={this.props.name}
        {...hour}/>);
    });
  }

  render() {
    const {hours, ...props} = this.props;
    return (
      <div {...props} className="Hours">
        {this.renderHours(hours)}
      </div>
    );
  }
}
