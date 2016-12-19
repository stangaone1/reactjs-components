import React from 'react';
import {expect} from 'chai';
import SelectableHeader from 'views/components/table/selectable-header';
import {renderIntoDocument} from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';

describe('Table Component', () => {
  describe('Selectable Header', () => {
    it('should render besides the header an checkbox input', () => {
      const component = renderIntoDocument(
            <SelectableHeader/>
      );
      const node = findDOMNode(component);
      const input = node.getElementsByTagName('input');
      const header = node.getElementsByTagName('div');
      expect(input.length).not.to.equal(0);
      expect(header.length).not.to.equal(0);
    });
  });
});
