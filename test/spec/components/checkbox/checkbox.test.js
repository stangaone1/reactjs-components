import React from 'react';
import Checkbox from 'views/components/checkbox/checkbox';
import * as utils from '../../../utils/utils';
import {renderIntoDocument,
        Simulate} from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import { expect } from 'chai';

import {spy} from 'sinon';

describe('Checkbox', () => {
  describe('render', () => {
    it('should have input[type=checkbox] as child', () => {
      const component = utils.shallowlyRenderedOutput(<Checkbox />);
      const childInput = component.props.children[0];

      expect(childInput.type).to.equal('input');
      expect(childInput.props.type).to.equal('checkbox');
    });

    it('should have correct text', () => {
      const labelText = 'Lorem ipsum';
      const component = utils.shallowlyRenderedOutput(<Checkbox label={labelText}/>);
      const childLabel = component.props.children[2];

      expect(childLabel.props.children).to.equal(labelText);
    });

    it('should be checked when prop checked provided', () => {
      const component = utils.shallowlyRenderedOutput(<Checkbox checked/>);
      const childInput = component.props.children[0];

      expect(childInput.props.checked).to.be.true;
    });

    it('should be disabled when prop disabled provided', () => {
      const component = utils.shallowlyRenderedOutput(<Checkbox disabled/>);
      const childInput = component.props.children[0];

      expect(childInput.props.disabled).to.be.true;
    });

    it('should have extra className when prop className provided', () => {
      const extraClass = 'testClass';
      const component = utils.shallowlyRenderedOutput(<Checkbox className={extraClass}/>);

      expect(component.props.className).to.contain(extraClass);
    });
  });

  describe('behaviour', () => {
    it('should trigger onchange handler', () => {
      const clickHandler = spy();
      const component = renderIntoDocument(<Checkbox onChange={clickHandler} />);
      const childInput = findDOMNode(component).children[0];

      Simulate.change(childInput);
      expect(clickHandler.called).to.be.true;
    });

    it('should not trigger onChange handlers if disabled', () => {
      const clickHandler = spy();
      const component = renderIntoDocument(<Checkbox onChange={clickHandler} disabled/>);
      const childInput = findDOMNode(component).children[0];

      Simulate.change(childInput);
      expect(clickHandler.called).to.be.false;
    });
  });
});
