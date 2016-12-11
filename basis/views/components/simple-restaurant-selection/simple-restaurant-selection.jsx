import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

import CheckboxSection from 'views/components/checkbox-section';
import Checkbox from 'views/components/checkbox';
import RestaurantPreview from './restaurant-preview';
import Panel from 'views/components/panel';
import ScrollArea from 'views/components/scroll-area';
import Icon from 'views/components/icon';

import './simple-restaurant-selection.scss';

export default class SimpleRestaurantSelection extends Component {
  static propTypes = {
    restaurantList: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedRestaurants: PropTypes.arrayOf(PropTypes.number),
    onRestaurantChange: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func,
    onHighlightRestaurant: PropTypes.func.isRequired,
    highlightedRestaurant: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {
    restaurantList: [],
    selectedRestaurants: [],
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.highlightedRestaurant !== nextProps.highlightedRestaurant) {
      this.refs.highlightedRestaurant.scrollTop();
    }
  }

  handleRestaurantSelect(restaurant, e) {
    e.stopPropagation();
    if (typeof this.props.onHighlightRestaurant === 'function') {
      this.props.onHighlightRestaurant(restaurant, e);
    }
    if (!e.isDefaultPrevented()) {
      this.setState({
        highlightedRestaurant: restaurant,
      });
    }
  }
  renderRestaurantItem(restaurant, index, ) {
    const {highlightedRestaurant, selectedRestaurants, onRestaurantChange} = this.props;
    let isHighlighted = false;
    if (highlightedRestaurant && highlightedRestaurant.id === restaurant.id) {
      isHighlighted = true;
    }
    const restaurantClass = cx(
      'SimpleRestaurantSelection-restaurant', {
        'SimpleRestaurantSelection-restaurant--highlighted': isHighlighted,
      }
    );

    return (
      <CheckboxSection
        key={restaurant.id}
        className={restaurantClass}
        label={restaurant.name}
        text={restaurant.address}
        selected={isHighlighted}
        checked={selectedRestaurants.indexOf(restaurant.id) > -1}
        onChange={onRestaurantChange.bind(this, restaurant, index)}
      >
        <Icon
          name="chevron"
          className="SimpleRestaurantSelection-restaurant-details"
          onClick={this.handleRestaurantSelect.bind(this, restaurant)}
        />
     </CheckboxSection>
    );
  }

  render() {
    const {
      selectedRestaurants,
      className,
      restaurantList,
      onSelectAll,
      onHighlightRestaurant,
      highlightedRestaurant,
      onRestaurantChange,
      ...props,
    } = this.props;
    return (
      <Panel
        {...props}
        label={(
          <div>
            Selected restaurants
            <span className="SimpleRestaurantSelection-counter">({selectedRestaurants.length})</span>
          </div>
        )}
        className={cx('SimpleRestaurantSelection', className)}
      >
        <div className="SimpleRestaurantSelection-list">
          <div className="SimpleRestaurantSelection-listHeader">
            <Checkbox
              label={(
                <div>
                  Select all
                  <span className="SimpleRestaurantSelection-counter">({restaurantList.length})</span>
                </div>
              )}
              className="SimpleRestaurantSelection-selectAll"
              checked={restaurantList.length === selectedRestaurants.length}
              onChange={onSelectAll}
            />
          </div>

          <ScrollArea className="SimpleRestaurantSelection-listContent" >
            {restaurantList.map((restaurant, index) => {
              return this.renderRestaurantItem(restaurant, index);
            })
          }</ScrollArea>
        </div>

        <ScrollArea
          ref="highlightedRestaurant"
          className="SimpleRestaurantSelection-previewContainer"
          >
          <RestaurantPreview restaurant={this.props.highlightedRestaurant}/>
        </ScrollArea>

      </Panel>
    );
  }
}
