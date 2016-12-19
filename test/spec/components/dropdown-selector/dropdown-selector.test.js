// deps
import React from 'react';
import * as utils from '../../../utils/utils';
import { expect } from 'chai';

// component to test
import DropdownSelector from 'views/components/dropdown-selector/dropdown-selector';

// noop
const noop = () => {};

describe('DropdownSelector', () => {
  // component default
  const DEFAULTS = {
    cssClass: 'Dropdown-selector',
    value: 'select value',

    props: {
      value: 'All restaurants',

      selectedItem: 2,
      items: [
        {
          id: 0,
          name: 'Emmie Bradtke',
          address: '05047 Fletcher Skyway',
        },
        {
          id: 1,
          name: 'Miss Derek Block',
          address: '8871 Elva Wells',
        },
        {
          id: 2,
          name: 'Miss Bessie Williamson',
          address: '891 Bridgette Mills',
        },
        {
          id: 3,
          name: 'Demetrius Kautzer',
          address: '377 Taurean Lakes',
        },
        {
          id: 4,
          name: 'Jaunita Boyle',
          address: '99806 Toy Meadow',
        },
      ],
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
      <DropdownSelector
        onSearch={noop}
        onSelect={noop}
      />
    );

    expect(instance.props.className).to.equal(DEFAULTS.cssClass);
  });

  //
  //  default rendering on no props
  //
  it('has correct rendering when no props', () => {
    instance = utils.shallowlyRenderedOutput(
      <DropdownSelector
        onSearch={noop}
        onSelect={noop}
      />
    );

    const dropdown = instance.props.children;

    expect(instance.props.items).to.not.exist;
    expect(dropdown.props.label).to.equal(DEFAULTS.value);
  });

  //
  //  default rendering with props
  //
  it('has correct rendering with props', () => {
    instance = utils.shallowlyRenderedOutput(
      <DropdownSelector
        value={DEFAULTS.props.value}
        items={DEFAULTS.props.items}
        selectedItem={DEFAULTS.props.selectedItem}

        onSearch={noop}
        onSelect={noop}
      />
    );

    const dropdown = instance.props.children;
    const list = dropdown.props.children;

    expect(dropdown.props.label).to.equal(DEFAULTS.props.value);
    expect(list.props.items.length).to.equal(DEFAULTS.props.items.length);
    expect(list.props.selectedItemId).to.equal(DEFAULTS.props.selectedItem);
  });
});
