import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import cx from 'classnames';
import listensToClickOutside from 'react-click-outside';

import DropDown from 'views/components/dropdown';
import Calendar from 'views/components/calendar';
import Icon from 'views/components/icon';

import './calendar-picker.scss';

@listensToClickOutside
export default class CalendarPicker extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    minDate: PropTypes.string,
    whenPublishLabel: PropTypes.node,
    noDateLabel: PropTypes.node,
    label: PropTypes.string,
    hideResetButton: PropTypes.bool,
    touched: PropTypes.bool,
    error: PropTypes.string,
  };

  static defaultProps = {
    noDateLabel: 'Select date',
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  handleClickOutside() {
    this.setState({
      open: false,
    });
  }

  onClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  onChange(val) {
    this.props.onChange(val);
  }

  onReset() {
    this.props.onChange(undefined);
  }

  renderResetButton() {
    if (this.props.hideResetButton) {
      return null;
    }

    return <Icon name="close" onClick={this.onReset}/>;
  }

  renderError() {
    const {error, touched} = this.props;
    if (error && touched) {
      return (<div className="CalendarPicker-error">{error}</div>);
    }
  }

  render() {
    const {
      className,
      value,
      onChange,
      noDateLabel,
      label,
      ...props,
    } = this.props;

    return (
      <div className={cx('CalendarPicker', {'CalendarPicker--hasValue': !!value}, className)}>
        <label className="InputField-Label">{label}</label>
        <div className="CalendarPicker-closeContainer">
          <DropDown
            className="CalendarDropdown"
            size="large"
            theme="dark"
            noPadding
            open={this.state.open}
            onClick={this.onClick}
            label={value
              ? `${moment(value).format('YYYY-MM-DD (dddd)')}`
              : noDateLabel}
          >
            <Calendar
              view={null}
              {...props}
              value={value}
              onChange={this.onChange}
            />
          </DropDown>
          {this.renderResetButton()}
        </div>
        {this.renderError()}
      </div>
    );
  }

}
