import React, {Component} from 'react';
import SlidesFilters from 'views/components/slides-filters';

export default class SlidesFiltersContainer extends Component {
  constructor() {
    super();

    this.state = {
      filters: [
        {
          name: 'Category',
          values: ['All categories', 'Jobs', 'Hiring', 'Events', 'Custom'],
        },
        {
          name: 'Type',
          values: ['All', 'Special job', 'Standard job'],
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <SlidesFilters filters={this.state.filters} resultsCount={4}
          onChange={(selection) => { console.log('Selection', selection); }} />
      </div>
    );
  }
}
