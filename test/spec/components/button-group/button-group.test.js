/* eslint-env mocha */

import React from 'react';
import {Button, ButtonGroup} from 'views/components/buttons';
import {findDOMNode} from 'react-dom';
import * as utils from '../../../utils/utils';
import {renderIntoDocument, isElementOfType, Simulate} from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import sinon from 'sinon';

describe('ButtonGroup', () => {
  let buttonGroupComponent = null;

  describe('rendering', () => {
    describe('render', () => {
      buttonGroupComponent = utils.shallowlyRenderedOutput(
        (<ButtonGroup>
          <Button />
          <Button />
          <Button />
        </ButtonGroup>)
      );
      it('should render a <div> as container', () => {
        expect(buttonGroupComponent.type).to.equal('div');
      });
      it('should have a class of "ButtonGroup"', () => {
        expect(buttonGroupComponent.props.className.split(' ')).to.contain('ButtonGroup');
      });
    });
    describe('children', () => {
      buttonGroupComponent = utils.shallowlyRenderedOutput(
        (<ButtonGroup>
          <Button />
          <Button />
          <Button />
        </ButtonGroup>)
      );
      it('should render children number correctly', () => {
        expect(buttonGroupComponent.props.children.length).to.equal(3);
      });
      it('should render children component type correctly', () => {
        expect(isElementOfType(buttonGroupComponent.props.children[0], Button)).to.be.true;
        expect(isElementOfType(buttonGroupComponent.props.children[1], Button)).to.be.true;
        expect(isElementOfType(buttonGroupComponent.props.children[2], Button)).to.be.true;
      });
    });
  });

  describe('behaviour', () => {
    let buttonNode = null;
    const clickHandler = sinon.spy();

    beforeEach(() => {
      clickHandler.reset();
    });

    it('should execute onClick function when a button is clicked with the index as an argument', () => {
      buttonGroupComponent = renderIntoDocument(
        (<ButtonGroup onIndexChange={clickHandler.bind(this)}>
          <Button />
          <Button />
          <Button />
        </ButtonGroup>)
      );
      buttonNode = findDOMNode(buttonGroupComponent).children[1];
      Simulate.click(buttonNode);
      expect(clickHandler.calledWith(1)).to.be.true;
    });
  });
});
