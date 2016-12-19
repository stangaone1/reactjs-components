// deps
import React from 'react';
import * as utils from '../../../utils/utils';
import { expect } from 'chai';

// component to test
import Footer from 'views/components/page/footer';

describe('Footer', () => {
  // component default
  const DEFAULTS = {
    cssClass: 'Page-footer',
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
      <Footer />
    );

    expect(instance.props.className).to.equal(DEFAULTS.cssClass);
  });

  //
  //  default rendering on no props
  //
  it('has correct rendering when no props', () => {
    instance = utils.shallowlyRenderedOutput(
      <Footer />
    );

    expect(instance.props.children).to.not.exist;
  });

  //
  //  child node provided
  //
  describe('when a child is provided', () => {
    it('shows that children', () => {
      instance = utils.shallowlyRenderedOutput(
        <Footer>{DEFAULTS.props.children}</Footer>
      );

      expect(instance.props.children).to.equal(DEFAULTS.props.children);
    });
  });
});
