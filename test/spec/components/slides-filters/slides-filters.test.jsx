import React from 'react';
import {findDOMNode} from 'react-dom';
import SlidesFilters from 'views/components/slides-filters';
import * as utils from '../../../utils/utils';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('SlidesFilters', () => {
  describe('display', () => {
    it('should display singular count correctly', () => {
      const component = utils.shallowlyRenderedOutput(<SlidesFilters filters={[]}
        resultsCount={1} onChange={(selection) => {  }} />);

      const header = component.props.children[0];
      const countChildren = header.props.children[1].props.children;

      expect(countChildren.join('')).to.equal('1 Result');
    });

    it('should display plural count correctly', () => {
      const component = utils.shallowlyRenderedOutput(<SlidesFilters filters={[]}
        resultsCount={4} onChange={(selection) => {  }} />);

      const header = component.props.children[0];
      const countChildren = header.props.children[1].props.children;

      expect(countChildren.join('')).to.equal('4 Results');
    });

    it('should have correct filters', () => {
      const filters = [
        {
          name: 'Category',
          values: ['All categories', 'Jobs'],
        },
        {
          name: 'Type',
          values: ['All'],
        },
      ];

      const component = utils.shallowlyRenderedOutput(<SlidesFilters filters={filters}
        resultsCount={4} onChange={(selection) => {  }} />);
      const listItems = component.props.children[1].props.children;
      const firstItem = listItems[0].props.children;
      const secondItem = listItems[1].props.children;

      expect(`${firstItem[0].props.children} ${firstItem[1].props.children.props.children.map(
        (option) => option.props.children
      ).join(' ')}`).to.equal('Category All categories Jobs');

      expect(`${secondItem[0].props.children} ${secondItem[1].props.children.props.children.map(
        (option) => option.props.children
      ).join(' ')}`).to.equal('Type All');
    });
  });

  describe('behavior', () => {
    it('should call the change handler with the selected filter value', () => {
      const filters = [
        {
          name: 'Category',
          values: ['All categories', 'Jobs'],
        },
        {
          name: 'Type',
          values: ['All'],
        },
      ];
      const changeHandler = spy();
      const component = TestUtils.renderIntoDocument(<SlidesFilters filters={filters}
        resultsCount={4} onChange={changeHandler} />);
      const select = findDOMNode(component).querySelector('select');
      TestUtils.Simulate.change(select, {target: {value: filters[0].values[1]}});
      expect(changeHandler.args).to.eql([[{filterName: filters[0].name, value: filters[0].values[1]}]]);
    });
  });
});
