import React, {Component} from 'react';
import SimpleRestaurantSelection from 'views/components/simple-restaurant-selection';
import restaurantList from './restaurant-list';
import getRestaurantOverview from './restaurant-details';

export default class SimpleRestaurantSelectionContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlightedRestaurant: void 0,
      selectedRestaurants: [],
      selectAll: 0,
    };
  }

  componentWillMount() {
    this.onHighlightRestaurant(restaurantList[0]);
  }

  onSelectAll() {
    if (restaurantList.length !== this.state.selectedRestaurants.length) {
      this.setState({
        selectedRestaurants: restaurantList.map((r) => r.id),
      });
    } else {
      this.setState({
        selectedRestaurants: [],
      });
    }
  }

  onHighlightRestaurant(restaurant) {
    if (this.state.highlightedRestaurant && restaurant.id === this.state.highlightedRestaurant.id) {
      return;
    }

    this.setState({highlightedRestaurant: restaurant});

    getRestaurantOverview(restaurant.id).then((restaurantOverview) => {
      if (restaurantOverview.id === this.state.highlightedRestaurant.id) {
        this.setState({
          highlightedRestaurant: restaurantOverview,
        });
      }
    });
  }

  onRestaurantChanged(restaurant, index, selected) {
    if (selected) {
      this.setState({
        selectedRestaurants: this.state.selectedRestaurants.concat(restaurant.id),
      });
    } else {
      const removedRestaurantIndex = this.state.selectedRestaurants.indexOf(restaurant.id);
      this.setState({
        selectedRestaurants: this.state.selectedRestaurants.slice(0, removedRestaurantIndex)
          .concat(this.state.selectedRestaurants.slice(removedRestaurantIndex + 1)),
      });
    }
  }

  render() {
    return (
      <div>
        <SimpleRestaurantSelection
          highlightedRestaurant={this.state.highlightedRestaurant}
          onHighlightRestaurant={this.onHighlightRestaurant.bind(this)}
          selectedRestaurants={this.state.selectedRestaurants}
          onRestaurantChange={this.onRestaurantChanged.bind(this)}
          onSelectAll={this.onSelectAll.bind(this)}
          restaurantList={restaurantList}
        />
      </div>
    );
  }
}
