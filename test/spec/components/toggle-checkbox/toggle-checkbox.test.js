import React from 'react';
import * as utils from '../../../utils/utils';
import TestUtils, {Simulate} from 'react-addons-test-utils';
import {assert, expect} from 'chai';
import {spy} from 'sinon';
import Checkbox from 'views/components/checkbox/checkbox';
import ToggleButton from 'views/components/toggle-button/toggle-button';
import ToggleCheckbox from 'views/components/toggle-checkbox/toggle-checkbox';

describe('Component', () => {
  describe('ToggleCheckbox', () => {
    // basic testing

    let state = {};
    const setState = (newState) => {
      state = newState;
    };

    const blindCallbacks = {
      onChange() {

      },
      onActivateFilter() {

      },
    };

    it('should have a <div> as container and should have a class of ToggleCheckbox', () => {
      const component = utils.shallowlyRenderedOutput(<ToggleCheckbox {...blindCallbacks} />);

      expect(component.type).to.equal('div');
      expect(component.props.className).to.equal('ToggleCheckbox');
    });

    it('should containe the checkbox and toggle button component', () => {
      const component = utils.shallowlyRenderedOutput(<ToggleCheckbox {...blindCallbacks} />);

      expect(TestUtils.isElementOfType(component.props.children[0], Checkbox)).to.be.true;
      expect(TestUtils.isElementOfType(component.props.children[1], ToggleButton)).to.be.true;
    });

    it('should implemenet custom class', () => {
      const component = utils.shallowlyRenderedOutput(<ToggleCheckbox className="Custom-Class" {...blindCallbacks} />);

      expect(component.props.className).to.contain('Custom-Class');
    });

    it('should be disabled', () => {
      const component = utils.shallowlyRenderedOutput(<ToggleCheckbox disabled {...blindCallbacks} />);

      expect(component.props.className).to.contain('disabled');
    });

    it('should be checked', () => {
      const component = utils.shallowlyRenderedOutput(<ToggleCheckbox checked {...blindCallbacks} />);

      expect(component.props.children[0].props.checked).to.be.true;
    });

    it('should respond to change checked event', () => {
      setState({
        checked: false,
      });

      const checkedEventSpy = spy(() => {
        setState({
          checked: true,
        });
      });

      const component = TestUtils.renderIntoDocument(<ToggleCheckbox checked={state.checked} onChange={checkedEventSpy} onActivateFilter = {() => {}} />);
      const checkbox = TestUtils.findRenderedDOMComponentWithClass(component, 'Checkbox-input');

      Simulate.change(checkbox, {target: {checked: 'checked'}});

      const checkedComponent = TestUtils.renderIntoDocument(<ToggleCheckbox checked={state.checked} onChange={checkedEventSpy} onActivateFilter = {() => {}} />);

      assert(checkedEventSpy.called);
      expect(checkedComponent.props.checked).to.be.true;
    });

    it('should be able to toggle the button when checked', () => {
      setState({
        checked: false,
      });

      const checkedEventSpy = spy(() => {
        setState({
          checked: true,
        });
      });

      const filterEventSpy = spy(() => {
        setState({
          checked: true,
          filterActive: true,
        });
      });

      let component = TestUtils.renderIntoDocument(<ToggleCheckbox
                                                      checked={state.checked}
                                                      filterActive={state.filterActive}
                                                      onChange={checkedEventSpy}
                                                      onActivateFilter={filterEventSpy} />);
      const checkbox = TestUtils.findRenderedDOMComponentWithClass(component, 'Checkbox-input');
      let button = TestUtils.findRenderedDOMComponentWithClass(component, 'ToggleButton');


      Simulate.click(button);

      // try to click the button when component is not called
      assert(filterEventSpy.notCalled);

      Simulate.change(checkbox, {target: {checked: 'checked'}});

      // regenerate the component with the new setState
      component = TestUtils.renderIntoDocument(<ToggleCheckbox
                                                      checked={state.checked}
                                                      filterActive={state.filterActive}
                                                      onChange={checkedEventSpy}
                                                      onActivateFilter={filterEventSpy} />);

      button = TestUtils.findRenderedDOMComponentWithClass(component, 'ToggleButton');

      Simulate.click(button);

      component = TestUtils.renderIntoDocument(<ToggleCheckbox
                                                      checked={state.checked}
                                                      filterActive={state.filterActive}
                                                      onChange={checkedEventSpy}
                                                      onActivateFilter={filterEventSpy} />);

      button = TestUtils.findRenderedDOMComponentWithClass(component, 'ToggleButton');

      assert(filterEventSpy.called);
      expect(button.getAttribute('class')).to.contain('ToggleButton--checked');
    });
  });
});
