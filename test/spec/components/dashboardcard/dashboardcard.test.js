import React from 'react';
import DashboardCard from 'views/components/dashboardcard-list/dashboardcard';
import * as utils from '../../../utils/utils';
import {renderIntoDocument, Simulate} from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('DashboardCard', () =>{
  let component;
  describe('render', ()=> {
    component = utils.shallowlyRenderedOutput(<DashboardCard />);
    it('should have a <div> as container and should have a class of .DashboardCard', () => {
      expect(component.type).to.equal('div');
      expect(component.props.className).to.equal('DashboardCard');
    });
    it('should have an option section', () => {
      const optionSection = component.props.children[1];
      expect(optionSection.type).to.equal('div');
      expect(optionSection.props.className.split(' ')).to.contain('DashboardCard-options');
    });

    it('should have a background image', () => {
      const imageSource = 'path/to/image.jpg';
      component = utils.shallowlyRenderedOutput(
        <DashboardCard backgroundImageSrc={imageSource} type="edit"/>);
      const image = component.props.children[0];
      expect(image.type).to.equal('img');
      expect(image.props.src).to.equal(imageSource);
    });
  });

  describe('behavior', ()=> {
    const componentCallback = { method: () => {} };
    const functionSpy = spy(componentCallback, 'method');

    beforeEach(() => {
      functionSpy.reset();
    });

    it('should trigger click callback with the index of the selected button', () => {
      component = renderIntoDocument(
        <DashboardCard
          onOptionClick={componentCallback.method}
        />);
      const buttonChildren = findDOMNode(component).children[1].children[0].children;
      Simulate.click(buttonChildren[0]);
      expect(functionSpy.lastCall.args[0]).to.equal(0);
      Simulate.click(buttonChildren[1]);
      expect(functionSpy.lastCall.args[0]).to.equal(1);
      Simulate.click(buttonChildren[2]);
      expect(functionSpy.lastCall.args[0]).to.equal(2);
      Simulate.click(buttonChildren[1]);
      expect(functionSpy.lastCall.args[0]).to.equal(1);
    });
  });
});
