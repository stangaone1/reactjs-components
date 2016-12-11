import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

import Icon from 'views/components/icon';

import './rating.scss';

function getPercentage(starsValue, starsCount) {
  return starsValue * 100 / starsCount;
}

function getPercentagePerStar(starsCount) {
  return 100 / starsCount;
}

function getRestStarPercentage(restPercentage, percentagePerStar) {
  return restPercentage / percentagePerStar * 100;
}

export default class Rating extends Component {
  static propTypes = {
    starsCount: PropTypes.number.isRequired,
    // if provided, overrides starsValue
    fillPercentage: PropTypes.number,
    // number between 0 and starsCount. it's used to calculate fillPercentage
    starsValue: PropTypes.number,
    readonly: PropTypes.bool,
    onRate: PropTypes.func,
  };

  static defaultProps = {
    starsValue: 0,
  };

  constructor(...args) {
    super(...args);

    this.state = {
      hoverIndex: -1,
    };

    this.onStarMouseLeave = this.onStarMouseLeave.bind(this);
  }

  onStarMouseEnter(i) {
    if (!this.props.readonly) {
      this.setState({hoverIndex: i});
    }
  }

  onStarMouseLeave() {
    this.setState({hoverIndex: -1});
  }

  onStarClick(i) {
    if (!this.props.readonly && this.props.onRate) {
      const starsValue = i + 1;

      this.props.onRate(starsValue, getPercentage(starsValue, this.props.starsCount));
    }
  }

  render() {
    const {fillPercentage, starsValue, starsCount} = this.props;
    const percentage = fillPercentage === undefined
      ? getPercentage(starsValue, starsCount)
      : percentage;
    const percentagePerStar = getPercentagePerStar(starsCount);
    const filledStarsCount = Math.floor(percentage / percentagePerStar);
    const restPercentage = percentage % percentagePerStar;
    const restStarPercentage = getRestStarPercentage(restPercentage, percentagePerStar);
    const partiallyFilledIndex = !!restStarPercentage && filledStarsCount;

    return (
      <div className={cx('Rating', {
        'Rating--clickable': !this.props.readonly,
        'Rating--hover': this.state.hoverIndex > -1,
      })}>
        {Array.from(Array(starsCount)).map((_, i) => {
          return (<div key={i} className={cx('Rating-star', {
            'Rating-star--filled': i < filledStarsCount,
            'Rating-star--hover': i <= this.state.hoverIndex,
          })}
            onMouseEnter={this.onStarMouseEnter.bind(this, i)}
            onMouseLeave={this.onStarMouseLeave}
            onClick={this.onStarClick.bind(this, i)} >
            {i === partiallyFilledIndex && <div style={{width: `${restStarPercentage}%`}}></div>}
            <Icon name="star-rating"/>
          </div>);
        })}
      </div>
    );
  }
}
