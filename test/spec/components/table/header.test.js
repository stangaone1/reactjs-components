import React from 'react';
import * as utils from '../../../utils/utils';
import {expect} from 'chai';
import Header from 'views/components/table/header';
import {renderIntoDocument, Simulate} from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import {spy} from 'sinon';

describe('Table Component', () => {
  describe('Header', () => {
    it('should contain div tag', () => {
      const component = utils.shallowlyRenderedOutput(<Header />);
      expect(component.type).to.equal('div');
    });

    it('should render passed name prop in a span child', () => {
      const component = utils.shallowlyRenderedOutput(<Header name="test"/>);
      const ownChildren = component.props.children.props.children[1];
      expect(ownChildren.props.children.indexOf('test')).not.to.equal(-1);
      expect(ownChildren.props.children.indexOf('asc')).to.equal(-1);
      expect(ownChildren.props.children.indexOf('desc')).to.equal(-1);
      expect(ownChildren.type).to.equal('span');
    });

    it('should render sortby asc text', () => {
      const component = utils.shallowlyRenderedOutput(<Header sortBy="ASC" sortKey="name" row="name" name="test"/>);
      const ownChildren = component.props.children.props.children[1];
      expect(ownChildren.type).to.equal('span');
    });

    it('should render children if needed', () => {
      const component = utils.shallowlyRenderedOutput(
        <Header>
          <div>child</div>
        </Header>
      );
      const propsChildren = component.props.children.props.children[0];
      expect(propsChildren.props.children).to.equal('child');
      expect(propsChildren.type).to.equal('div');
    });

    it('should not trigger sort callback', () => {
      const sortCallbackSpy = spy();
      const component = renderIntoDocument(
            <Header onColumnSort={sortCallbackSpy}/>
      );
      const childInput = findDOMNode(component);
      Simulate.click(childInput);
      expect(sortCallbackSpy.called).to.be.false;
    });

    it('should trigger sort callback if the header is sortable', () => {
      const sortCallbackSpy = spy();
      const component = renderIntoDocument(
          <Header sort sortable onColumnSort={sortCallbackSpy}/>
      );
      const node = findDOMNode(component);
      const header = node.getElementsByTagName('div')[0];
      Simulate.click(header);
      expect(sortCallbackSpy.called).to.be.true;
    });
  });
});
