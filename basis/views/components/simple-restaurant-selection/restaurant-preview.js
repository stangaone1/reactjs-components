import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

import {SidePreviewRestaurant} from 'views/components/side-preview';
import Icon from 'views/components/icon';


import './restaurant-preview.scss';


export default class RestaurantPreview extends Component {
  static propTypes = {
    restaurant: PropTypes.object,
    className: PropTypes.string,
  };

  renderItemIcon(item) {
    if (item.completed) {
      return (
        <Icon name="completed-big"/>
      );
    }

    return (
      <Icon name="uncompleted-big"/>
    );
  }

  renderDetails(restaurant) {
    if (!restaurant.overview) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <ul className="SimpleRestaurantSelectionPreview-categoryList">
        {Object.keys(restaurant.overview).map((categorySlug) => {
          const category = restaurant.overview[categorySlug];
          return (
            <li key={categorySlug} className="SimpleRestaurantSelectionPreview-category">
              <div className="SimpleRestaurantSelectionPreview-categoryHeader">
                {category.name}
              </div>
              <ul className="SimpleRestaurantSelectionPreview-categoryBody">
                {category.overview.map((item) => {
                  return (
                    <li key={item.id} className="SimpleRestaurantSelectionPreview-categoryItem">
                      {this.renderItemIcon(item)}
                      {item.name}
                    </li>
                  );
                })}
                <li></li>
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const {restaurant, className} = this.props;
    if (!restaurant) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div className={cx('SimpleRestaurantSelectionPreview', className)}>
        <SidePreviewRestaurant
          title={restaurant.name}
          subtitle={restaurant.address}/>
        {this.renderDetails(restaurant)}

      </div>
    );
  }
}
