
import React from 'react';
import CheckboxSection from 'views/components/checkbox-section';
import Checkbox from 'views/components/checkbox/checkbox';
import { renderIntoDocument, Simulate, isElementOfType } from 'react-addons-test-utils';
import * as utils from '../../../utils/utils';
import {findDOMNode} from 'react-dom';
import { expect } from 'chai';
import {spy} from 'sinon';


describe('CheckboxSection', () => {
  describe('display', () => {
    it('contains Checkbox component', () => {
      const extraClass = 'testClass';
      const component = utils.shallowlyRenderedOutput(
        <CheckboxSection className={extraClass}/>
      );
      expect(isElementOfType(component.props.children[0], Checkbox)).to.be.true;
    });

    it('has extra class when provided', () => {
      const extraClass = 'testClass';
      const component = utils.shallowlyRenderedOutput(
        <CheckboxSection className={extraClass}/>
      );

      expect(component.type).to.equal('div');
      expect(component.props.className).to.contain(extraClass);
    });

    it('has --noText modifier & 1 child when no test is provided', () => {
      const noTextClass = 'CheckboxSection--noText';
      const component = utils.shallowlyRenderedOutput(<CheckboxSection />);

      expect(component.props.className).to.contain(noTextClass);
      expect(component.props.children[1]).to.equal(null);
    });

    it('displays text from text prop', () => {
      const textProp = 'lorem ipsum dolor';
      const component = utils.shallowlyRenderedOutput(
        <CheckboxSection text={textProp} />
      );
      const textChild = component.props.children[1];

      expect(textChild.props.className).to.equal('CheckboxSection-text');
      expect(textChild.props.children).to.equal(textProp);
    });
  });

  describe('behavior', () => {
    it('should trigger click handler', () => {
      const clickHandler = spy();
      const component = renderIntoDocument(
        <CheckboxSection label="click me" onChange={clickHandler} />
      );

      Simulate.click(findDOMNode(component));
      expect(clickHandler).to.have.been.called;
    });

    it('should not trigger click handlers if disabled', () => {
      const clickHandler = spy();
      const component = renderIntoDocument(
        <CheckboxSection disabled onChange={clickHandler} />
      );

      Simulate.click(findDOMNode(component));
      expect(clickHandler).to.have.not.been.called;
    });
  });
});
