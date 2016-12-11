import React, {Component, PropTypes} from 'react';
import {customDateTitle} from 'lib/utils/dates';

import restrictedCompare from 'lib/utils/restricted-compare';
import {Button, ButtonGroup} from 'views/components/buttons';
import TimeSelect from 'views/components/time-select';

import './day-open-status.scss';

export const OPEN_STATUS = {
  open: 0,
  open24h: 1,
  closed: 2,
};

export default class DayOpenStatus extends Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
    onDayStatusChanged: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.any,
    renderOpenButtons: PropTypes.bool,
  };

  static defaultProps = {
    renderOpenButtons: true,
  }

  constructor(props) {
    super(props);
    this.onDayOpenStatusChanged = this.onDayOpenStatusChanged.bind(this);
    this.onDayTimeChanged = this.onDayTimeChanged.bind(this);
    this.state = {
      selectedIndex: 0,
    };
  }

  componentWillMount() {
    this.updateOpenStatus(this.props.day);
  }

  componentWillReceiveProps(nextProps) {
    this.updateOpenStatus(nextProps.day);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return restrictedCompare(this, nextProps, nextState);
  }

  updateOpenStatus(day) {
    if (day.closed) {
      this.setState({
        selectedIndex: OPEN_STATUS.closed,
      });
    } else if (day.open24h) {
      this.setState({
        selectedIndex: OPEN_STATUS.open24h,
      });
    } else {
      this.setState({
        selectedIndex: OPEN_STATUS.open,
      });
    }
  }

  onDayOpenStatusChanged(newIndex) {
    const newDay = {...this.props.day};

    if (this.state.selectedIndex !== newIndex) {
      this.setState({
        selectedIndex: newIndex,
      }, ()=> {
        if (this.props.onDayStatusChanged) {
          newDay.open24h = this.state.selectedIndex === OPEN_STATUS.open24h;
          newDay.closed = this.state.selectedIndex === OPEN_STATUS.closed;
          this.props.onDayStatusChanged(newDay);
        }
      });
    }
  }

  onDayTimeChanged(timeStatus, selectedTime) {
    const newDay = {...this.props.day};
    newDay[timeStatus] = selectedTime;
    if (this.props.onDayStatusChanged) {
      this.props.onDayStatusChanged(newDay);
    }
  }

  renderTime() {
    if (this.state.selectedIndex === OPEN_STATUS.open || !this.props.renderOpenButtons) {
      const {to, from} = this.props.day;
      return (
        <div className="DayTime">
          <TimeSelect maxTime={to} time={from} onChange={this.onDayTimeChanged.bind(this, 'from')}/>
          <span className="DayTime-separator">-</span>
          <TimeSelect minTime={from} time={to} onChange={this.onDayTimeChanged.bind(this, 'to')}/>
        </div>
      );
    }
  }

  renderButtonGroup() {
    if (this.props.renderOpenButtons) {
      return (
        <ButtonGroup
          onIndexChange={this.onDayOpenStatusChanged}
          selectedIndex={this.state.selectedIndex}
        >
          <Button>OPEN</Button>
          <Button>OPEN 24H</Button>
          <Button>CLOSED</Button>
        </ButtonGroup>
      );
    }
  }

  render() {
    const {title, children, ...props} = this.props;
    const name = this.props.day.name;
    const date = this.props.day.date;
    const dayTitle = title || name || customDateTitle(date);

    return (
      <div {...props} className="Day">
        <div className="Day-title">{dayTitle}</div>
        <div className="Day-status">
          {this.renderButtonGroup()}
          {this.renderTime()}
        </div>
        {children}
      </div>
    );
  }
}
