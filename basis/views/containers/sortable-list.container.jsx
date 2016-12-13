import React, {Component} from 'react';

import SortableList from 'views/components/sortable-list';

import facilitiesPhoto from 'assets/images/test.jpg';
import jobsPhoto from 'assets/images/test.jpg';
import mcFactsPhoto from 'assets/images/test.jpg';
import openingHoursPhoto from 'assets/images/test.jpg';

const cards = {
  facilities: facilitiesPhoto,
  mcFacts: mcFactsPhoto,
  jobs: jobsPhoto,
  openingHours: openingHoursPhoto,
};

export default class SortableListContainer extends Component {
  constructor() {
    super();
    this.state = {
      cardsOrder: ['jobs', 'mcFacts', 'openingHours', 'facilities'],
    };
    this.onListChanged = this.onListChanged.bind(this);
  }

  onListChanged(cardsOrder) {
    this.setState({
      cardsOrder: cardsOrder,
    });
  }

  render() {
    return (
      <div>
        <SortableList cards={cards} cardsOrder={this.state.cardsOrder} onChange={this.onListChanged} />
      </div>
    );
  }
}
