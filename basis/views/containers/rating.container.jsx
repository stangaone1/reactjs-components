import React, { Component } from 'react';
import Rating from 'views/components/rating';

export default class RatingContainer extends Component {
  render() {
    return (
      <div>
        <Rating starsCount={5}/>
      </div>
    );
  }
}

RatingContainer.displayName = 'RatingContainer';
