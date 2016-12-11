import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import moment from 'moment';
import {Button, ButtonGroup} from 'views/components/buttons';
import DropDown from 'views/components/dropdown';
import Calendar from 'views/components/calendar';

import './calendarButton.scss';


export default class CalendarButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    minDate: PropTypes.any,
    whenPublishLabel: PropTypes.node,
    noDateLabel: PropTypes.node,
  };

  static defaultProps = {
    whenPublishLabel: 'When published',
    noDateLabel: 'On a specific date',
    minDate: moment().add(-1, 'days').format('YYYY-MM-DD'),
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleDateChange = this.onDateChange.bind(this);
  }

  handleIndexChange(index) {
    if (this.props.onChange) {
      this.props.onChange(index ? this.props.value : 0);
    }

    this.setState({
      open: this.state.open ? false : !!index,
    });
  }

  onDateChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    this.setState({open: false});
  }

  render() {
    const {
      className,
      value,
      onChange,
      noDateLabel,
      whenPublishLabel,
      ...props,
      } = this.props;

    let compiledValue = value;

    let selectedIndex = -1;
    if (typeof compiledValue === 'string') {
      compiledValue = moment(compiledValue);
      selectedIndex = 1;
    } else if (typeof compiledValue === 'number') {
      if (compiledValue > 0) {
        selectedIndex = 1;
      } else {
        selectedIndex = 0;
      }
    }

    return (
      <ButtonGroup
        className={cx('CalendarButton', className)}
        onIndexChange={this.handleIndexChange.bind(this)}
        selectedIndex={selectedIndex}
      >
        <Button>{whenPublishLabel}</Button>
        <DropDown
          className="CalendarDropdown"
          size="large"
          theme="dark"
          noPadding
          open={this.state.open}
          label={compiledValue ? `on ${moment(compiledValue).format('YYYY-MM-DD')}` : noDateLabel}
        >
          <Calendar
            {...props}
            value={compiledValue}
            onChange={this.handleDateChange}
          />
        </DropDown>
      </ButtonGroup>
    );
  }

}
