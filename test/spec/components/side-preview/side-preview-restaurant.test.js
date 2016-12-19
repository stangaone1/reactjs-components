import React from 'react';
import {SidePreviewRestaurant, SidePreviewSection} from 'views/components/side-preview';
import * as utils from '../../../utils/utils';
import {expect} from 'chai';
import { shallow } from 'enzyme';

describe('SidePreviewRestaurant', () => {
  describe('container', () => {
    const side = utils.shallowlyRenderedOutput(<SidePreviewRestaurant title={"Restaurant name"}/>);

    it('should render as SidePreviewSection', () => {
      expect(side.type).to.equal(SidePreviewSection);
    });

    it('should render with class SidePreviewRestaurant', () => {
      expect(side.props.className).to.include('SidePreviewRestaurant');
    });
  });

  describe('content', () => {
    const side = shallow(
      <SidePreviewRestaurant
        title="Restaurant name"
        subtitle="Restaurant address"
      >
        Custom content
      </SidePreviewRestaurant>
    );

    describe('title', () => {
      const title = side.find('.SidePreviewRestaurant-Title');
      it('should render with class "SidePreviewRestaurant-Title"', () => {
        expect(title.length).to.equal(1);
      });

      it('should render  "Restaurant name"', () => {
        expect(title.text()).to.equal('Restaurant name');
      });
    });

    describe('subtitle', () => {
      const subtitle = side.find('.SidePreviewRestaurant-Subtitle');
      it('should render with class "SidePreviewRestaurant-Subtitle"', () => {
        expect(subtitle.length).to.equal(1);
      });

      it('should render  "Restaurant address"', () => {
        expect(subtitle.text()).to.equal('Restaurant address');
      });
    });

    describe('children', () => {
      const subtitle = side.find('.SidePreviewRestaurant-Content');
      it('should render with class "SidePreviewRestaurant-Content"', () => {
        expect(subtitle.length).to.equal(1);
      });

      it('should render  "Restaurant address"', () => {
        expect(subtitle.text()).to.equal('Custom content');
      });
    });
  });
});
