import React from 'react';
import Panel from 'views/components/panel';
import * as utils from '../../../utils/utils';
// import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

describe('Panel', () => {
  describe('simple', () => {
    const divPanel = utils.shallowlyRenderedOutput(
      <Panel label="header text" className="customClass">
        this is the content
      </Panel>
    );
    const header = divPanel.props.children[0];
    const content = divPanel.props.children[1];

    it('should render as div', () => {
      expect(divPanel.type).to.equal('div');
    });

    it('should render with class Panel', () => {
      expect(divPanel.props.className).to.include('Panel');
    });

    it('should render two children, a header and a content', () => {
      expect(divPanel.props.children.length).to.equal(2);
    });

    it('header text should contain "header text"', () => {
      expect(header.props.children).to.equal('header text');
    });

    it('content text should contain "this is the content"', () => {
      expect(content.props.children).to.equal('this is the content');
    });

    it('should use given classes', ()=> {
      expect(divPanel.props.className).to.include('customClass');
    });
  });

  describe('custom element', () => {
    const liPanel = utils.shallowlyRenderedOutput(<Panel element="li" header="header text">this is the content</Panel>);

    it('should render as div', () => {
      expect(liPanel.type).to.equal('li');
    });
  });
});
