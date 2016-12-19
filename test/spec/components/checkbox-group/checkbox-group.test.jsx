import React from 'react';
import CheckboxGroup from 'views/components/checkbox-group';
import Checkbox from 'views/components/checkbox/checkbox';
import * as utils from '../../../utils/utils';
import TestUtils, {Simulate} from 'react-addons-test-utils';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('CheckboxGroup', () => {
  const customClass = 'testCheckboxGroup';
  const valuesPartial = [false, true, false];
  let state = {
    values: [true, true, true],
  };
  const setState = (newState) => {
    state = newState;
  };
  const _onGroupCheckedChange = spy(() => {
    setState({
      values: state.values.every((value) => value) ? [false, false, false] : [true, true, true],
    });
  });
  const _onItemCheckedChange = spy((index) => {
    state.values[index] = !state.values[index];
  });

  const groupPartial = (
    <CheckboxGroup
      label="parentCheckbox"
      checked={valuesPartial.every((value) => value)}
      partial={valuesPartial.some((value) => value)}
      className={customClass}
    >
      <Checkbox
        label="Checkbox label"
        checked={false}
      />
      <Checkbox
        label="Checkbox label"
        checked
      />
      <Checkbox
        label="Checkbox label"
        checked={false}
      />
    </CheckboxGroup>
  );

  const groupDisabled = (
    <CheckboxGroup
      label="parentCheckbox"
      checked={valuesPartial.every((value) => value)}
      partial={valuesPartial.some((value) => value)}
      className={customClass}
      onChange={_onGroupCheckedChange}
      disabled
    >
      <Checkbox
        label="Checkbox label"
        checked={false}
      />
      <Checkbox
        label="Checkbox label"
        checked
      />
      <Checkbox
        label="Checkbox label"
        checked={false}
      />
    </CheckboxGroup>
  );

  const groupChecked = (
    <CheckboxGroup
      label="parentCheckbox"
      checked={state.values.every((value) => value)}
      partial={state.values.some((value) => value)}
      onChange={_onGroupCheckedChange}
      className={customClass}
    >
      <Checkbox
        label="Checkbox label"
        checked={state.values[0]}
        onChange={_onItemCheckedChange.bind(this, 0)}
      />
      <Checkbox
        label="Checkbox label"
        checked={state.values[1]}
        onChange={_onItemCheckedChange.bind(this, 1)}
      />
      <Checkbox
        label="Checkbox label"
        checked={state.values[2]}
        onChange={_onItemCheckedChange.bind(this, 2)}
      />
    </CheckboxGroup>
  );

  describe('display', () => {
    it('has a div.CheckboxGroup as a container', () => {
      const component = utils.shallowlyRenderedOutput(groupPartial);

      expect(component.type).to.equal('div');
      expect(component.props.className).to.contain('CheckboxGroup');
    });

    it('renders custom class', () => {
      const component = TestUtils.renderIntoDocument(groupPartial);

      expect(component.props.className).to.contain(customClass);
    });

    it('has a Checkbox as the first child with the class CheckboxGroup-parent', () => {
      const component = utils.shallowlyRenderedOutput(groupPartial);
      const firstChild = component.props.children[0];

      expect(TestUtils.isElementOfType(firstChild, Checkbox)).to.be.true;
      expect(firstChild.props.className).to.contain('CheckboxGroup-parent');
    });

    it('has as many div.CheckboxGroup-item as children', () => {
      const component = TestUtils.renderIntoDocument(groupPartial);
      const items = TestUtils.scryRenderedDOMComponentsWithClass(component, 'CheckboxGroup-item');
      const childrenLength = component.props.children.length;

      expect(items.length).to.equal(childrenLength);
    });

    it('renders disabled checkboxs if prop disabled is true', () => {
      const component = utils.shallowlyRenderedOutput(groupDisabled);
      const firstChild = component.props.children[0];

      expect(firstChild.props.disabled).to.be.true;
    });

    it('has .Checkbox--partial when at least on child is checked', () => {
      const component = TestUtils.renderIntoDocument(groupPartial);
      const partial = TestUtils.scryRenderedDOMComponentsWithClass(component, 'Checkbox--partial');

      expect(partial.length).to.equal(1);
    });

    it('has CheckboxGroup-parent checked when all children are checked', () => {
      const component = TestUtils.renderIntoDocument(groupChecked);
      const firstChild = component.props.children[0];

      expect(firstChild.props.checked).to.be.true;
    });
  });

  describe('behavior:', () => {
    it('calls CheckboxGroup onChange on CheckboxGroup-parent click', () => {
      const component = TestUtils.renderIntoDocument(groupChecked);
      const inputs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'Checkbox-input');

      Simulate.change(inputs[0]);

      expect(_onGroupCheckedChange).to.have.been.called;
    });

    it('prevents onChange if components is disabled', () => {
      const component = TestUtils.renderIntoDocument(groupDisabled);
      const inputs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'Checkbox-input');

      Simulate.change(inputs[0]);

      expect(_onGroupCheckedChange).to.have.not.been.called;
    });

    it('triggers callback on child click', () => {
      const component = TestUtils.renderIntoDocument(groupChecked);
      const inputs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'Checkbox-input');

      Simulate.change(inputs[1]);

      expect(_onItemCheckedChange).to.have.been.called;
    });

    it('unchecks all children of a checked CheckboxGroup on CheckboxGroup-parent click', () => {
      let component = TestUtils.renderIntoDocument(groupChecked);
      let inputs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'Checkbox-input');

      // reset state
      setState({
        values: [true, true, true],
      });

      // click on parent checkbox
      Simulate.change(inputs[0]);

      // rerender component with new state
      component = TestUtils.renderIntoDocument(
        <CheckboxGroup
          label="parentCheckbox"
          checked={state.values.every((value) => value)}
          partial={state.values.some((value) => value)}
          onChange={_onGroupCheckedChange}
          className={customClass}
        >
          <Checkbox
            label="Checkbox label"
            checked={state.values[0]}
            onChange={_onItemCheckedChange.bind(this, 0)}
          />
          <Checkbox
            label="Checkbox label"
            checked={state.values[1]}
            onChange={_onItemCheckedChange.bind(this, 1)}
          />
          <Checkbox
            label="Checkbox label"
            checked={state.values[2]}
            onChange={_onItemCheckedChange.bind(this, 2)}
          />
        </CheckboxGroup>
      );
      inputs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'Checkbox-input');

      expect(inputs[0].checked).to.be.false;
      expect(inputs[1].checked).to.be.false;
      expect(inputs[2].checked).to.be.false;
      expect(inputs[3].checked).to.be.false;
    });
  });
});
