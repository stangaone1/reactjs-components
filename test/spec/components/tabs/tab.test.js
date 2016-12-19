import React from 'react';
import Tab from 'views/components/tab-list/tab';
import * as utils from '../../../utils/utils';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

describe('Components', () => {
  describe('Tab', () => {
    it('should have a li as container', () => {
      const component = utils.shallowlyRenderedOutput(<Tab selected={false}/>);
      expect(component.type).to.equal('li');
      expect(component.props.className).to.equal('Tab-Item');
    });

    it('should contain children', () => {
      const component = utils.shallowlyRenderedOutput(<Tab/>);
      expect(typeof TestUtils.isElementOfType(component.props.children) !== 'undefined').to.be.true;
    });

    it('should have a selected class', () => {
      const component = utils.shallowlyRenderedOutput(<Tab selected/>);
      expect(component.type).to.equal('li');
      expect(component.props.className).to.not.equal('Tab-Item');
      expect(component.props.className).to.equal('Tab-Item Tab-Item--selected');
    });

    it('should be disabled', () => {
      const component = utils.shallowlyRenderedOutput(<Tab disabled/>);
      expect(component.props.className).to.equal('Tab-Item Tab-Item--disabled');
      expect(component.props.className).to.not.equal('Tab-Item Tab-Item--selected');
    });

    it('should have title', () => {
      const component = utils.shallowlyRenderedOutput(<Tab title="test"/>);
      expect(component.props.children.props.children).to.equal('test');
    });

    it('should not have default title', () => {
      const component = utils.shallowlyRenderedOutput(<Tab/>);
      expect(component.props.children.props.children).to.not.exist;
    });
  });
});
