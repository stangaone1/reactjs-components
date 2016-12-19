import React from 'react';
import * as utils from '../../../utils/utils';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {findDOMNode} from 'react-dom';
import SelectableCell from 'views/components/table/selectable-cell';

const selectableDemoText = 'demo';
const SelectableComponent = class SelectComponent extends React.Component {
  render() {
    return (<div>{selectableDemoText}</div>);
  }
};

describe('Table Component', () => {
  describe('Selectable Cell', () => {
    it('should container the native checkbox selectable component', () => {
      const component = utils.shallowlyRenderedOutput(<SelectableCell />);
      expect(component.props.checked).to.equal.false;
      expect(component.props.selectable).to.equal.false;
      expect(component.props.children.type).to.equal('input');
    });

    it('should have a default input of type checkbox', () => {
      const component = utils.shallowlyRenderedOutput(<SelectableCell />);
      expect(component.props.children.props.type).to.equal('checkbox');
      expect(component.props.children.props.checked).to.equal.false;
    });

    it('should add a callback to the default checkbox', () => {
      const component = utils.shallowlyRenderedOutput(<SelectableCell />);
      expect(component.props.children.props.onChange).to.equal.function;
    });

    it('should render a custom selectable component', () => {
      const wrappedSelectableCellComponent = (
          <SelectableCell selectableComponent={SelectableComponent}/>
      );
      const component = TestUtils.renderIntoDocument(wrappedSelectableCellComponent);
      const node = findDOMNode(component);
      expect(node.getElementsByTagName('div')[0].innerHTML).to.equal(selectableDemoText);
    });
  });
});
