import React from 'react';
import Radio from 'views/components/radio/radio';
import * as utils from '../../../utils/utils';
import {renderIntoDocument,
        Simulate} from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import { expect } from 'chai';

import {spy} from 'sinon';

describe('Radio', () => {
  describe('render', () => {
    it('should have input[type=radio] as child', () => {
      const component = utils.shallowlyRenderedOutput(<Radio />);
      const childInput = component.props.children[0];

      expect(childInput.type).to.equal('input');
      expect(childInput.props.type).to.equal('radio');
    });

    it('should have correct text', () => {
      const labelText = 'Lorem ipsum';
      const component = utils.shallowlyRenderedOutput(<Radio label={labelText}/>);
      const childLabel = component.props.children[2];

      expect(childLabel.props.children).to.equal(labelText);
    });

    it('should be checked when prop checked provided', () => {
      const component = utils.shallowlyRenderedOutput(<Radio checked/>);
      const childInput = component.props.children[0];

      expect(childInput.props.checked).to.be.true;
    });

    it('should be disabled when prop disabled provided', () => {
      const component = utils.shallowlyRenderedOutput(<Radio disabled/>);
      const childInput = component.props.children[0];

      expect(childInput.props.disabled).to.be.true;
    });

    it('should have extra className when prop className provided', () => {
      const extraClass = 'testClass';
      const component = utils.shallowlyRenderedOutput(<Radio className={extraClass}/>);

      expect(component.props.className).to.contain(extraClass);
    });
  });

  describe('behaviour', () => {
    it('should trigger click handler', () => {
      const clickHandler = spy();
      const component = renderIntoDocument(<Radio onChange={clickHandler} />);
      const childInput = findDOMNode(component).children[0];

      Simulate.change(childInput);
      expect(clickHandler.called).to.be.true;
    });
    it('should not trigger click handlers if disabled', () => {
      const clickHandler = spy();
      const component = renderIntoDocument(<Radio onChange={clickHandler} disabled/>);
      const childInput = findDOMNode(component).children[0];

      Simulate.change(childInput);
      expect(clickHandler.called).to.be.false;
    });
  });
});
