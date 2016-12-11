import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import cx from 'classnames';
import {Button} from 'views/components/buttons';
import Icon from 'views/components/icon';

import './nextprev.scss';

export default class NextPrev extends Component {
  static displayName = 'NextPrev';

  static propTypes = {
    prevDisabled: PropTypes.bool.isRequired,
    nextDisabled: PropTypes.bool.isRequired,
    onClickPrev: PropTypes.func,
    onClickNext: PropTypes.func,
    prevProps: PropTypes.object,
    nextProps: PropTypes.object,
    className: PropTypes.string,
    labelSide: PropTypes.oneOf(['left', 'right']),
    total: PropTypes.number,
    maxVisible: PropTypes.number,
    current: PropTypes.number,
  };

  static defaultProps = {
    prevDisabled: false,
    nextDisabled: false,
    maxVisible: 1,
    current: 1,
    prevProps: {},
    nextProps: {},
  };


  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  // @label: [currentStart] - [currentEnd] of [totalNumber]
  renderLabel(shouldRender) {
    if (!shouldRender) {
      return null;
    }

    const {
      labelSide,
      total,
      maxVisible,
      current,
      } = this.props;
    const currentStart = maxVisible * (current - 1) + 1;
    const currentEnd = maxVisible * current <= total ? maxVisible * current : total;

    return (
      <div className={'NextPrev-label NextPrev-label--' + labelSide}>
        {currentStart + ' - ' + currentEnd}
        <span className="NextPrev-labelSeparator"> of </span>
        {total}
      </div>
    );
  }

  renderButtons() {
    const {
      prevDisabled,
      nextDisabled,
      prevProps,
      nextProps,
      onClickPrev,
      onClickNext,
      } = this.props;

    return (
      <div className="NextPrev-buttons">
        <Button
          {...prevProps}
          disabled={prevDisabled}
          className="NextPrev-prevButton"
          onClick={onClickPrev}>
          <Icon name="chevron" />
        </Button>
        <Button
          {...nextProps}
          disabled={nextDisabled}
          className="NextPrev-nextButton"
          onClick={onClickNext}>
          <Icon name="chevron" />
        </Button>
      </div>
    );
  }

  render() {
    const {
      className,
      labelSide,
      ...otherProps } = this.props;

    return (
      <div {...otherProps} className={cx(className, 'NextPrev')}>
        {this.renderLabel(labelSide === 'left')}
        {this.renderButtons()}
        {this.renderLabel(labelSide === 'right')}
      </div>
    );
  }
}
