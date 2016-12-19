/* eslint-env mocha */
import React from 'react';
import ToggleButton from 'views/components/toggle-button/toggle-button';
import * as utils from '../../../utils/utils';
import {renderIntoDocument, Simulate} from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('ToggleButton', () => {
  let toggleButtonComponent = null;
  let toggler = null;

  describe('render', () => {
    it('should have a <div> as container and should have a class of .ToggleButton', () => {
      toggleButtonComponent = utils.shallowlyRenderedOutput(<ToggleButton />);
      expect(toggleButtonComponent.type).to.equal('div');
      expect(toggleButtonComponent.props.className).to.equal('ToggleButton');
    });

    it('should contain a toggle indicator with a class of .ToggleButton-toggler', () => {
      toggleButtonComponent = utils.shallowlyRenderedOutput(<ToggleButton />);
      toggler = toggleButtonComponent.props.children;
      expect(toggler.type).to.equal('div');
      expect(toggler.props.className).to.equal('ToggleButton-toggler');
    });
    it('should have a coresponding via props.checked', () => {
      toggleButtonComponent = utils.shallowlyRenderedOutput(<ToggleButton checked/>);
      expect(toggleButtonComponent.props.className).to.equal('ToggleButton ToggleButton--checked');
    });
  });

  describe('behavior', () => {
    let checkedState = false;
    const stateChanger = {
      changeState: () => {
        checkedState = !checkedState;
      },
    };

    function renderComponent() {
      return renderIntoDocument(
        <ToggleButton
          checked={checkedState}
          onClick={stateChanger.changeState.bind(this)}
        />);
    }

    const clickHandler = spy(stateChanger, 'changeState');

    it('should trigger onToggleClick when clicked', () => {
      toggleButtonComponent = renderComponent();
      Simulate.click(findDOMNode(toggleButtonComponent));
      expect(clickHandler.calledOnce).to.be.true;
    });

    it('should toggle states when clicked', () => {
      checkedState = false;
      // inital - unchecked
      toggleButtonComponent = renderComponent();
      expect(toggleButtonComponent.props.checked).to.be.false;

      Simulate.click(findDOMNode(toggleButtonComponent));
      // checked
      toggleButtonComponent = renderComponent();
      expect(toggleButtonComponent.props.checked).to.be.true;

      Simulate.click(findDOMNode(toggleButtonComponent));
      // unchecked
      toggleButtonComponent = renderComponent();
      expect(toggleButtonComponent.props.checked).to.be.false;
    });
  });
});
