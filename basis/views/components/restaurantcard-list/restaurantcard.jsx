// deps
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { isNaN } from 'lodash';
import shallowCompare from 'react-addons-shallow-compare';

// components
import { SectionCard, SectionCardHeader, SectionCardBody, SectionCardFooter } from 'views/components/section-card';
import CountTracker from 'views/components/count-tracker';

// constants
const TIME_FORMAT = 'MM / DD / YYYY';
const MESSAGES = {
  modified: 'Modified on: ',
  nevermodified: 'Never modified',
};

export default class RestaurantCard extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    modified: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    slides: PropTypes.object.isRequired,
    maxSlides: PropTypes.number.isRequired,

    onCardAction: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.onRestaurantSelect = this.onRestaurantSelect.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onRestaurantSelect() {
    if (this.props.onCardAction) {
      this.props.onCardAction();
    }
  }

  getLastModifiedTime(time) {
    const lastModified = parseInt(time, 10);
    const isValid = !isNaN(lastModified);

    // check if date is valid
    if (!isValid || lastModified === 0) {
      return MESSAGES.nevermodified;
    }

    // format last modified date
    const date = moment(lastModified, 'X').format(TIME_FORMAT); // unix timestamp

    return `${MESSAGES.modified} ${date}`;
  }

  render() {
    const { name, address, modified, slides, maxSlides } = this.props;
    const lastModified = this.getLastModifiedTime(modified);

    // boards count trackers
    const trackers = [
      {
        title: 'CREW',
        content: <CountTracker current={slides.crew} max={maxSlides} />,
      },
      {
        title: 'COMMUNITY',
        content: <CountTracker current={slides.community} max={maxSlides} />,
      },
    ];

    return (
      <SectionCard className="RestaurantCard">
        <SectionCardHeader title={name} content={address} />
        <SectionCardBody notifications={trackers} />
        <SectionCardFooter
          buttonTitle="View details"
          onCardAction={this.onRestaurantSelect}

          content={lastModified}
        />
      </SectionCard>
    );
  }
}
