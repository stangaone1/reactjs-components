import React from 'react';
import HorizontalList from 'views/components/horizontal-list';
import * as utils from '../../../utils/utils';
import {expect} from 'chai';

describe('HorizontalList', () => {
  describe('simple', () => {
    const horizontalListContainer = utils.shallowlyRenderedOutput(
      <HorizontalList className="customClass">
        <li>
          element1
        </li>
        <li>
          element1
        </li>
      </HorizontalList>
    );

    describe('container', () => {
      it('should be of type "div"', () => {
        expect(horizontalListContainer.type).to.equal('div');
      });

      it('should render with class HorizontalList-container', () => {
        expect(horizontalListContainer.props.className).to.include('HorizontalListContainer');
      });

      it('should use given classes', ()=> {
        expect(horizontalListContainer.props.className).to.include('customClass');
      });

      it('shouldn\'t render with class HorizontalList-selfScrolled', () => {
        expect(horizontalListContainer.props.className).to.not.include('HorizontalListContainer-selfScrolled');
      });
    });

    const horizontalList = horizontalListContainer.props.children;

    describe('list', () => {
      it('should exist', () => {
        expect(horizontalList).to.not.equal(void 0);
      });

      it('should be of type "ul"', () => {
        expect(horizontalList.type).to.equal('ul');
      });

      it('should render with class HorizontalList', () => {
        expect(horizontalList.props.className).to.equal('HorizontalList');
      });

      it('should render 3 list items', () => {
        expect(horizontalList.props.children.length).to.equal(2);
      });
    });
  });

  describe('self scrollable', () => {
    const scrollableHorizontalList = utils.shallowlyRenderedOutput(<HorizontalList scrollable/>);
    it('should render with class HorizontalListContainer-selfScrolled', () => {
      expect(scrollableHorizontalList.props.className).to.include('HorizontalListContainer--selfScrolled');
    });
  });
});
