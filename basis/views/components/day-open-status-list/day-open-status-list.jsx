import React, {Component, PropTypes} from 'react';
import {merge, cloneDeep} from 'lodash';

import {customDateTitle} from 'lib/utils/dates';

import DayOpenStatus from 'views/components/day-open-status';
import {PanelContent} from 'views/components/panel';

import './day-open-status-list.scss';

export default class DayOpenStatusList extends Component {
  static propTypes = {
    days: PropTypes.array.isRequired,
    isMultiple: PropTypes.bool,
    onDaysStatusChanged: PropTypes.func,
    onMultipleDayStatusChanged: PropTypes.func,
    children: PropTypes.any,
    renderOpenButtons: PropTypes.bool,
  };

  static defaultProps = {
    days: [],
  };

  constructor() {
    super();
    this.onMultipleDayStatusChanged = this.onMultipleDayStatusChanged.bind(this);
  }

  onDayStatusChanged(index, day) {
    const {days} = this.props;
    const newDays = cloneDeep(days);
    newDays[index] = day;

    if (this.props.onDaysStatusChanged) {
      this.props.onDaysStatusChanged(newDays);
    }
  }

  onMultipleDayStatusChanged(day) {
    const {days} = this.props;
    let newDays = cloneDeep(days);

    newDays = newDays.map(newDay => {
      const newDayName = newDay.name;
      const newNewDay = merge({}, newDay, day);
      newNewDay.name = newDayName;
      return newNewDay;
    });

    if (this.props.onDaysStatusChanged) {
      this.props.onDaysStatusChanged(newDays);
    }
  }

  renderDays(days, isMultiple) {
    const renderOpenButtons = this.props.renderOpenButtons !== null ? this.props.renderOpenButtons : true;

    if (!isMultiple) {
      return days.map((day, index)=> {
        return (
          <PanelContent className="PanelContentDays" key={index}>
            <DayOpenStatus day={day}
                           renderOpenButtons={renderOpenButtons}
                           onDayStatusChanged={this.onDayStatusChanged.bind(this, index)}/>
          </PanelContent>
        );
      });
    }

    const customTitle = `${days[0].name || customDateTitle(days[0].date)} - ${days[days.length - 1].name || customDateTitle(days[days.length - 1].date)}`;

    return (
      <PanelContent className="PanelContentMultipleDays">
        <DayOpenStatus title={customTitle}
                       day={days[0]}
                       renderOpenButtons={renderOpenButtons}
                       onDayStatusChanged={this.onMultipleDayStatusChanged}
        />
      </PanelContent>
    );
  }

  render() {
    const {days, children, isMultiple, ...props} = this.props;
    return (
      <div {...props} className="Days">
        {this.renderDays(days, isMultiple)}
        {children}
      </div>
    );
  }
}
