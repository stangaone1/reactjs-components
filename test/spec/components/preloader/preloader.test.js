// deps
import React from 'react';
import * as utils from '../../../utils/utils';
import { expect } from 'chai';

// component to test
import Preloader from 'views/components/preloader/preloader';

describe('Preloader', () => {
  // component default
  const DEFAULTS = {
    cssClass: 'Preloader',
    title: 'Save changes',
    pending: 'Saving changes...',

    props: {
      busy: true,
      title: 'Save!',
      pending: 'Saving...',
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
      <Preloader />
    );

    expect(instance.props.className).to.equal(DEFAULTS.cssClass);
  });

  //
  //  default rendering on no props
  //
  it('has correct rendering when no props', () => {
    instance = utils.shallowlyRenderedOutput(
      <Preloader />
    );

    // status message & icon
    expect(instance.props.children[0]).to.equal(DEFAULTS.title);
    expect(instance.props.children[1]).to.not.exist;

    expect(instance.props.busy).to.equal(false);
  });

  //
  //  default rendering with props
  //
  it('has correct rendering with props', () => {
    instance = utils.shallowlyRenderedOutput(
      <Preloader
        title={DEFAULTS.props.title}
        pending={DEFAULTS.props.pending}
        busy={DEFAULTS.props.busy} />
    );

    // status message & icon
    expect(instance.props.children[0]).to.equal(DEFAULTS.props.pending);
    expect(instance.props.children[1]).to.exist;

    expect(instance.props.busy).to.equal(DEFAULTS.props.busy);
  });
});
