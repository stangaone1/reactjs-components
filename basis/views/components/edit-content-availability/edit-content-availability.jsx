import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import {preventAllEvents} from 'lib/utils/prevent-events';

import CalendarButton from 'views/components/calendarButton';


import './edit-content-availability.scss';

export default class EditContentAvailability extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    /**
     * Redux form field
     */
    startDate: PropTypes.object,
    /**
     * Redux form field
     */
    endDate: PropTypes.object,
    disabled: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  renderChildren(children) {
    if (children) {
      return (
        <div className="EditContentAvailability-children">
          {children}
        </div>
      );
    }
  }

  render() {
    const {
      className,
      startDate,
      endDate,
      children,
      disabled,
      ...props,
      } = this.props;

    const componentClasses = cx('EditContentAvailability', className);

    return (
      <div {...props} className={componentClasses}>
        <div className="EditContentAvailability-field EditContentAvailability-startDate">
          <label className="EditContentAvailability-label">Start Date:</label>
          <CalendarButton
            {...startDate}
            {...preventAllEvents}
            disabled={disabled}
          />
        </div>
        <div className="EditContentAvailability-field EditContentAvailability-endDate">
          <label className="EditContentAvailability-label">End Date:</label>
          <CalendarButton
            {...endDate}
            {...preventAllEvents}
            whenPublishLabel="When deactivated"
            minDate={startDate.value}
            disabled={disabled}
          />
        </div>

        {this.renderChildren(children)}
      </div>
    );
  }
}

