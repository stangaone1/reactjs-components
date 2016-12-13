import React, {Component} from 'react';
import DashboardCard from 'views/components/dashboardcard-list/dashboardcard';

const actions = [
  'ADD',
  'CHANGE',
  'EDIT',
  'DELETE',
];
const imageSrcs = [
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?dpr=2&fit=crop&fm=jpg&h=975&ixlib=rb-0.3.5&q=50&w=1925',
  'https://images.unsplash.com/photo-1438907046657-4ae137eb8c5e?ixlib=rb-0.3.5&q=80&fm=jpg&w=1080&fit=max&s=ed5ac6d5cef11e80f6d59d4c6b104a5c',
];

export default class DashboardCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCardMessage: '',
    };
  }

  // card is provided from the container and action from the component
  _editCardClick(card, action) {
    this.setState({selectedCardMessage:
      `Selected card: ${card} , selected action: ${actions[action + 1]}`,
    });
  }

  render() {
    return (
      <div>
        <DashboardCard
          backgroundImageSrc={imageSrcs[0]}
          onOptionClick={this._editCardClick.bind(this, 0)}
        />
        <DashboardCard
          backgroundImageSrc={imageSrcs[1]}
          onOptionClick={this._editCardClick.bind(this, 1)}
        />
        <h4>{this.state.selectedCardMessage}</h4>
      </div>);
  }
}
