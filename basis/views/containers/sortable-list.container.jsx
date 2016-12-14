import React, {Component} from 'react';

import SortableList from 'views/components/sortable-list';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext} from 'react-dnd';

import test1 from 'assets/images/test2.png';
import test2 from 'assets/images/test.jpg';
import test3 from 'assets/images/test.jpg';
import test4 from 'assets/images/test.jpg';

const cards = {
  facilities: test1,
  mcFacts: test3,
  jobs: test2,
  openingHours: test4,
};

@dragDropContext(HTML5Backend)
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
