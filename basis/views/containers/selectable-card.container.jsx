import React, {Component} from 'react';

import SelectableCard from 'views/components/selectable-card';

import card from 'assets/images/test.jpg';

export default class SelectableCardContainer extends Component {
  constructor() {
    super();
    this.state = {
      selected: false,
    };
    this.onCardSelect = this.onCardSelect.bind(this);
  }

  onCardSelect(selected) {
    this.setState({
      selected: selected,
    });
  }

  render() {
    return (
      <div>
        <SelectableCard card={card}
                        selected={this.state.selected}
                        onSelect={this.onCardSelect}
        />
      </div>
    );
  }
}
