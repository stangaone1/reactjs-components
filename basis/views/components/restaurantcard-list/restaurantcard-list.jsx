// deps
import React, { Component, PropTypes } from 'react';

// components
import RestaurantCard from 'views/components/restaurantcard-list/restaurantcard';

// style
import './restaurantcard-list.scss';

export default class RestaurantCardList extends Component {
  static propTypes = {
    list: PropTypes.array,
    maxSlides: PropTypes.number,

    onRestaurantSelect: PropTypes.func,
  };

  static defaultProps = {
    list: [],
    maxSlides: 5,
  };

  getRestaurantsList() {
    const { list, maxSlides } = this.props;

    // map boards list
    const restaurantsList = list.map((restaurant, idx) => {
      return (
        <RestaurantCard
          key={'restaurant-' + idx}
          nrn={restaurant.idRestaurant}
          name={restaurant.name}
          address={restaurant.location.friendlyAddress}
          modified={restaurant.slides.lastModified}

          slides={restaurant.slides}
          maxSlides={maxSlides}

          onCardAction={this.onRestaurantSelect.bind(this, restaurant)}
        />
      );
    });

    return restaurantsList;
  }

  onRestaurantSelect(restaurant) {
    if (this.props.onRestaurantSelect) {
      this.props.onRestaurantSelect(restaurant);
    }
  }

  render() {
    // get restaurants items list
    const restaurantsList = this.getRestaurantsList();

    return (
      <div className="RestaurantCardList">
        <div className="RestaurantCardList-Items">
          {restaurantsList}
        </div>
      </div>
    );
  }
}
