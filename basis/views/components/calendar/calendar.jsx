import React, {PropTypes} from 'react';
import cx from 'classnames';

import DatePicker from 'react-date-picker';
// check https://github.com/zippyui/react-date-picker#props
// for list of props of Calendar to pass

import './calendar.scss';

const Calendar = ({value, className, ...props}) => {
  return (
    <DatePicker
      view="month"
      {...props}
      className={cx('Calendar', className)}
      hideFooter
      date={value}
    />
  );
};

Calendar.displayName = 'Calendar';
Calendar.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default Calendar;
