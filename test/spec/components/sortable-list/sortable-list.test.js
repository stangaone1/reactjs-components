import React from 'react';
import SortableList from 'views/components/sortable-list';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('SortableList', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<SortableList />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class SortableList', () => {
      const component = shallow(<SortableList />);
      expect(component.hasClass('SortableList')).to.be.true;
    });

    it('should render give class CustomSortableList', () => {
      const component = shallow(<SortableList className="CustomSortableList"/>);
      expect(component.hasClass('CustomSortableList')).to.be.true;
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<SortableList onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
