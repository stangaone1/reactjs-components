import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';
import Select from 'views/components/select';

import './time-select.scss';

export default class TimeSelect extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    time: PropTypes.string,
    minTime: PropTypes.string,
    maxTime: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    time: '00:00',
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleMinuteChange = this.onChange.bind(this, 'minute');
    this.handleHourChange = this.onChange.bind(this, 'hour');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onChange(selected, id, time) {
    let hour;
    let minutes;
    if (selected === 'hour') {
      hour = moment(time, 'HH a').format('HH');
      minutes = moment(this.props.time, 'HH:mm').format('mm');
    } else if (selected === 'minute') {
      hour = moment(this.props.time, 'HH:mm').format('hh');
      minutes = time;
    }
    if (this.props.onChange) {
      this.props.onChange(hour + ':' + minutes);
    }
  }

  renderHours(currentHour) {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }
    return (
      <div className="TimeSelect-hours">
        <Select
          onChange={this.handleHourChange}
          value={currentHour}
          placeholder={currentHour}
        >
          {
            hours.map((hour, index) => {
              let disabled = false;
              if (this.props.minTime) {
                const minDiff = moment.duration(moment(hour, 'HH').diff(moment(this.props.minTime, 'HH'))).asHours();
                if (minDiff === 0) {
                  disabled = true;
                }
              }
              if (this.props.maxTime) {
                const maxDiff = moment.duration(moment(this.props.maxTime, 'HH').diff(moment(hour, 'HH'))).asHours();
                if (maxDiff === 0) {
                  disabled = true;
                }
              }

              return (<option disabled={disabled} key={index} value={index}>{moment(hour, 'HH').format('hh a')}</option>);
            })
          }
        </Select>
      </div>
    );
  }

  renderMinutes(currentMinutes) {
    const minutes = ['00', '15', '30', '45'];
    return (
      <div className="TimeSelect-minutes">
        <Select
          onChange={this.handleMinuteChange}
          value={currentMinutes}
          placeholder={currentMinutes}
          className="TimeSelect-minutes"
        >
          {
            minutes.map((minute, index) => {
              return (<option key={index} value={index}>{minute}</option>);
            })
          }
        </Select>
      </div>
    );
  }

  render() {
    const {className, children, time, ...props} = this.props;
    const componentClasses = cx('TimeSelect', className);

    return (
      <div className={componentClasses} {...props}>
        {this.renderHours(moment(time, 'HH:mm').format('hh a'))}
        {this.renderMinutes(moment(time, 'HH:mm').format('mm'))}
        {children}
      </div>
    );
  }
}

