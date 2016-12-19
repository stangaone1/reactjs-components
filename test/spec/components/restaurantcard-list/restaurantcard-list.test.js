import React from 'react';
import RestaurantCardList from 'views/components/restaurantcard-list';
import {shallow} from 'enzyme';
import {expect} from 'chai';

describe('RestaurantCardList', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<RestaurantCardList />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class RestaurantCardList', () => {
      const component = shallow(<RestaurantCardList />);
      expect(component.hasClass('RestaurantCardList')).to.be.true;
    });
  });
});
