import React from 'react';
import {SidePreviewSection} from 'views/components/side-preview';
import * as utils from '../../../utils/utils';
import {expect} from 'chai';
import { shallow } from 'enzyme';

describe('SidePreviewSection', () => {
  describe('default', () => {
    const side = utils.shallowlyRenderedOutput(
      <SidePreviewSection />
    );

    it('should render as div', () => {
      expect(side.type).to.equal('div');
    });

    it('should render with class SidePreviewSection', () => {
      expect(side.props.className).to.equal('SidePreviewSection');
    });
  });

  describe('custom', () => {
    const side = shallow(
      <SidePreviewSection element="li" className="customClass">
        <a href="#">
           custom content
        </a>
      </SidePreviewSection>
    );

    it('should render as li', () => {
      expect(side.is('li')).to.be.true;
    });

    it('should render with class SidePreviewSection', () => {
      expect(side.is('.SidePreviewSection')).to.be.true;
    });

    it('should render with custom class "customClass"', () => {
      expect(side.is('.customClass')).to.be.true;
    });

    it('should render children', () => {
      expect(side.find('a').length).to.equal(1);
      expect(side.find('a').text()).to.equal('custom content');
    });
  });
});
