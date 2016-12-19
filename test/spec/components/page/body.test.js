// deps
import React from 'react';
import * as utils from '../../../utils/utils';
import { expect } from 'chai';

// component to test
import Body from 'views/components/page/body';

describe('Body', () => {
  // component default
  const DEFAULTS = {
    cssClass: 'Page-body',
    props: {
      children: 'page body here',
    },
  };

  // clear instance on each test
  let instance;
  afterEach(() => { instance = null; });

  //
  //  default class
  //
  it(`has correct default class (${DEFAULTS.cssClass})`, () => {
    instance = utils.shallowlyRenderedOutput(
      <Body />
    );

    expect(instance.props.className).to.equal(DEFAULTS.cssClass);
  });

  //
  //  default rendering on no props
  //
  it('has correct rendering when no props', () => {
    instance = utils.shallowlyRenderedOutput(
      <Body />
    );

    expect(instance.props.children).to.not.exist;
  });

  //
  //  child node provided
  //
  describe('when a child is provided', () => {
    it('shows that children', () => {
      instance = utils.shallowlyRenderedOutput(
        <Body>{DEFAULTS.props.children}</Body>
      );

      expect(instance.props.children).to.equal(DEFAULTS.props.children);
    });
  });
});
