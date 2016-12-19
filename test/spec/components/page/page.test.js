// deps
import React from 'react';
import * as utils from '../../../utils/utils';
import { expect } from 'chai';

// component to test
import Page from 'views/components/page/page';

describe('Page', () => {
  // component default
  const DEFAULTS = {
    cssClass: 'Page-content',
    props: {
      children: 'page content here',
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
      <Page />
    );

    expect(instance.props.className).to.equal(DEFAULTS.cssClass);
  });

  //
  //  default rendering on no props
  //
  it('has correct rendering when no props', () => {
    instance = utils.shallowlyRenderedOutput(
      <Page />
    );

    expect(instance.props.children).to.not.exist;
  });

  //
  //  child node provided
  //
  describe('when a child is provided', () => {
    it('shows that children', () => {
      instance = utils.shallowlyRenderedOutput(
        <Page>{DEFAULTS.props.children}</Page>
      );

      expect(instance.props.children).to.equal(DEFAULTS.props.children);
    });
  });
});
