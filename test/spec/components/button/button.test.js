/* eslint-env mocha */

import React from 'react';
import Button from 'views/components/buttons/button';

import * as utils from '../../../utils/utils';
import {renderIntoDocument, Simulate} from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import {expect} from 'chai';
import sinon from 'sinon';

describe('Button', () => {
  let buttonComponent = null;

  describe('rendering', () => {
    it('should have a class of "Button"', () => {
      buttonComponent = utils.shallowlyRenderedOutput(<Button />);
      expect(buttonComponent.props.className.split(' ')).to.contain('Button');
    });
    it('should have a text for the button, even when text is not provided', () => {
      const text = 'test';
      buttonComponent = utils.shallowlyRenderedOutput(<Button>{text}</Button>);
      expect(buttonComponent.props.children).to.equal(text);
      buttonComponent = utils.shallowlyRenderedOutput(<Button/>);
      expect(buttonComponent.props.children).to.equal('Button');
    });
    it('should render as a button (default)', () => {
      buttonComponent = utils.shallowlyRenderedOutput(<Button />);
      expect(buttonComponent.type).to.equal('button');
    });

    describe('size', () => {
      it('should have correct classes for small', () => {
        buttonComponent = utils.shallowlyRenderedOutput(<Button size="small"/>);
        expect(buttonComponent.props.className.split(' ')).to.contain('Button--small');
      });
    });

    describe('type', () => {
      it('should have correct classes for type main', () => {
        buttonComponent = utils.shallowlyRenderedOutput(<Button type="main"/>);
        expect(buttonComponent.props.className.split(' ')).to.contain('Button--main');
      });
      it('should have correct classes for type dropdown', () => {
        buttonComponent = utils.shallowlyRenderedOutput(<Button type="dropdown"/>);
        expect(buttonComponent.props.className.split(' ')).to.contain('Button--dropdown');
      });
    });

    describe('modifiers', () => {
      it('should have correct classes if default', () => {
        buttonComponent = utils.shallowlyRenderedOutput(<Button block/>);
        expect(buttonComponent.props.className.split(' ')).to.contain('Button--block');
      });
      it('should have correct classes if selected', () => {
        buttonComponent = utils.shallowlyRenderedOutput(<Button selected/>);
        expect(buttonComponent.props.className.split(' ')).to.contain('Button--selected');
      });
      it('should have correct classes if disabled', () => {
        buttonComponent = utils.shallowlyRenderedOutput(<Button disabled/>);
        expect(buttonComponent.props.className.split(' ')).to.contain('Button--disabled');
      });
      it('should have correct classes if opened (for dropdown)', () => {
        buttonComponent = utils.shallowlyRenderedOutput(<Button type="dropdown" opened/>);
        expect(buttonComponent.props.className.split(' ')).to.contain('Button--opened');
      });
    });
  });

  describe('behaviour', () => {
    let buttonNode = null;
    const clickHandler = sinon.spy();

    beforeEach(() => {
      clickHandler.reset();
    });

    it('should execute onClick function when clicked', () => {
      buttonComponent = renderIntoDocument(
        <Button onClick={clickHandler}>Button</Button>
      );
      buttonNode = findDOMNode(buttonComponent);
      Simulate.click(buttonNode);
      expect(clickHandler.called).to.be.true;
    });

    it('should not execute onClick function when disabled', () => {
      buttonComponent = renderIntoDocument(
        <Button onClick={clickHandler} disabled>Button</Button>
      );
      buttonNode = findDOMNode(buttonComponent);
      Simulate.click(buttonNode);
      expect(clickHandler.called).to.be.false;
    });
  });
});
