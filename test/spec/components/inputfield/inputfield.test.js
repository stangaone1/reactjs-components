import React from 'react';
import TestUtils, {Simulate} from 'react-addons-test-utils';
import {expect} from 'chai';
import {findDOMNode} from 'react-dom';
import InputField from 'views/components/inputfield/inputfield';

describe('Components', () => {
  describe('InputField', () => {
    // test default class

    it('should have the correct class', () => {
      const component = TestUtils.renderIntoDocument(<InputField />);
      const node = findDOMNode(component);

      expect(node.className).to.equal('InputField');
    });

    // test custom class
    it('should have custom class', () => {
      const component = TestUtils.renderIntoDocument(<InputField className="MyCustomClass" />);
      const node = findDOMNode(component);

      expect(node.className).to.contain('MyCustomClass');
    });

    // test if the component is disabled
    it('should disable when prop disabled tag is present', () => {
      const component = TestUtils.renderIntoDocument(<InputField disabled value="initial value" />);
      const input = TestUtils.findRenderedDOMComponentWithClass(component, 'InputField-Input');
      const node = findDOMNode(component);

      Simulate.change(input, {target: {value: 'some different value'}});

      expect(node.className).to.contain('disabled');
      expect(input.disabled).to.be.true;
      expect(input.value).to.equal('initial value');
    });

    it('should be able to set a placeholder', () => {
      const component = TestUtils.renderIntoDocument(<InputField placeholder = "An awesome placeholder" />);
      const input = TestUtils.findRenderedDOMComponentWithClass(component, 'InputField-Input');

      expect(input.getAttribute('placeholder')).to.equal('An awesome placeholder');
    });

    it('should render as textarea when multiline is true', () => {
      const component = TestUtils.renderIntoDocument(<InputField multiline />);
      const textarea = TestUtils.findRenderedDOMComponentWithTag(component, 'textarea');
      const node = findDOMNode(component);

      expect(node.className).to.contain('InputField--multiline');
      expect(TestUtils.isDOMComponent(textarea)).to.be.true;
    });

    it('should accept an icon and display it', () => {
      const inputIcon = <img className="ImageIcon" src="" width="100%" />;

      const component = TestUtils.renderIntoDocument(<InputField icon = {inputIcon} />);
      const icon = TestUtils.findRenderedDOMComponentWithClass(component, 'ImageIcon');

      expect(TestUtils.isDOMComponent(icon)).to.be.true;
    });
  });
});
