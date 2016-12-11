// deps
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

// style
import './count-tracker.scss';

const propTypes = {
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  separator: PropTypes.string,
  nocolor: PropTypes.bool,
};

const defaultProps = {
  separator: '/',
  nocolor: false,
};

class CountTracker extends Component {
  getCount() {
    const count = `${this.props.current}${this.props.separator}${this.props.max}`;
    return count;
  }

  render() {
    const counter = this.getCount();

    // css classes
    const classNames = cx({
      'CountTracker': true,
      'CountTracker--low': (this.props.current === 0),
      'CountTracker--medium': (this.props.current > 0 && this.props.current < this.props.max),
      'CountTracker--high': (this.props.current === this.props.max),
      'CountTracker--nocolor': (this.props.nocolor),
    });

    return (
      <div className={classNames}>
        {counter}
      </div>
    );
  }
}

CountTracker.propTypes = propTypes;
CountTracker.defaultProps = defaultProps;

export default CountTracker;
