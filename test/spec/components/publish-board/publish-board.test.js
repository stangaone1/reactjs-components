import React from 'react';
import TestUtils, {Simulate} from 'react-addons-test-utils';
import * as utils from '../../../utils/utils';
import {expect} from 'chai';
import {spy} from 'sinon';
import PublishBoard from 'views/components/publish-board';

describe('Component', () => {
  describe('PublishBoard', () => {
    const requiredProps = {
      onCloseBoard: () => {},
      onPrevPage: () => {},
      onNextPage: () => {},
    };

    describe('render', () => {
      it('should have the correct class', () => {
        const component = utils.shallowlyRenderedOutput(<PublishBoard {...requiredProps} />);

        expect(component.type).to.equal('div');
        expect(component.props.className).to.equal('PublishBoard');
      });

      it('should have custom class', () => {
        const component = utils.shallowlyRenderedOutput(<PublishBoard className="MyCustomClass" {...requiredProps} />);

        expect(component.type).to.equal('div');
        expect(component.props.className).to.contain('MyCustomClass');
      });

      it('should render preview, sidebar and backface children', () => {
        const component = TestUtils.renderIntoDocument(
          <PublishBoard {...requiredProps}>
            <preview className="preview">Preview content</preview>
            <sidebar className="sidebar">Sidebar content</sidebar>
            <backface className="backface">Backface content</backface>
          </PublishBoard>
        );
        const previewNode = TestUtils.findRenderedDOMComponentWithClass(component, 'preview');
        const sidebarNode = TestUtils.findRenderedDOMComponentWithClass(component, 'sidebar');
        const backfaceNode = TestUtils.findRenderedDOMComponentWithClass(component, 'backface');

        expect(previewNode.innerHTML).to.equal('Preview content');
        expect(sidebarNode.innerHTML).to.equal('Sidebar content');
        expect(backfaceNode.innerHTML).to.equal('Backface content');
      });

      it('should render action buttons in component correctly', () => {
        const actions = [
          {
            label: 'Button test',
            onClick: () => {},
          },
          {
            label: 'Button second test',
            onClick: () => {},
          },
        ];

        const backfaceActions = [
          {
            label: 'Button test backface',
            onClick: () => {},
          },
          {
            label: 'Button second test backface',
            onClick: () => {},
          },
        ];

        const component = TestUtils.renderIntoDocument(
          <PublishBoard {...requiredProps}>
            <preview className="preview">Preview content</preview>
            <sidebar className="sidebar" actions={actions}>Sidebar content</sidebar>
            <backface className="backface" actions={backfaceActions}>Backface content</backface>
          </PublishBoard>
        );

        const buttonsNodes = TestUtils.scryRenderedDOMComponentsWithClass(component, 'PublishBoardActions-Button');

        expect(buttonsNodes.length).to.equal(4);
        expect(buttonsNodes[0].innerHTML).to.equal('Button test');
        expect(buttonsNodes[1].innerHTML).to.equal('Button second test');
        expect(buttonsNodes[2].innerHTML).to.equal('Button test backface');
        expect(buttonsNodes[3].innerHTML).to.equal('Button second test backface');
      });

      it('should render action buttons with custom classnames', () => {
        const actions = [
          {
            className: 'MyLittleClass',
            label: 'Button test',
            onClick: () => {},
          },
          {
            label: 'Button second test',
            onClick: () => {},
          },
          {
            className: 'MyOtherClass',
            label: 'Button second test',
            onClick: () => {},
          },
        ];

        const component = TestUtils.renderIntoDocument(
          <PublishBoard {...requiredProps}>
            <preview className="preview">Preview content</preview>
            <sidebar className="sidebar" actions={actions}>Sidebar content</sidebar>
          </PublishBoard>
        );

        const buttonsNodes = TestUtils.scryRenderedDOMComponentsWithClass(component, 'PublishBoardActions-Button');

        expect(buttonsNodes.length).to.equal(3);
        expect(buttonsNodes[0]._classList.contains('MyLittleClass')).to.equal(true);
        expect(buttonsNodes[1]._classList.contains('Button')).to.equal(true);
        expect(buttonsNodes[2]._classList.contains('MyOtherClass')).to.equal(true);
      });
    });

    describe('behavior', ()=>{
      it('should trigger the close callback', () => {
        const spyFunc = spy();
        requiredProps.onCloseBoard = spyFunc;
        const component = TestUtils.renderIntoDocument(
          <PublishBoard {...requiredProps}>
            <preview className="preview">Preview content</preview>
            <sidebar className="sidebar">Sidebar content</sidebar>
          </PublishBoard>
        );

        const closeButtonNode = TestUtils.findRenderedDOMComponentWithClass(component, 'PublishBoardControls-CloseButton');

        Simulate.click(closeButtonNode);

        expect(spyFunc.called).to.be.true;
      });

      it('should trigger the action button callbacks', () => {
        const firstButtonClick = spy();
        const secondButtonClick = spy();

        const actions = [
          {
            label: 'Button test',
            onClick: firstButtonClick,
          },
          {
            label: 'Button second test',
            onClick: secondButtonClick,
          },
        ];

        const component = TestUtils.renderIntoDocument(
          <PublishBoard {...requiredProps}>
            <preview className="preview">Preview content</preview>
            <sidebar className="sidebar" actions={actions}>Sidebar content</sidebar>
          </PublishBoard>
        );

        const buttonsNodes = TestUtils.scryRenderedDOMComponentsWithClass(component, 'PublishBoardActions-Button');

        Simulate.click(buttonsNodes[0]);
        Simulate.click(buttonsNodes[1]);

        expect(firstButtonClick.calledOnce).to.be.true;
        expect(secondButtonClick.calledOnce).to.be.true;
      });

      it('should flip when the flip action is called', () => {
        const component = TestUtils.renderIntoDocument(
          <PublishBoard {...requiredProps}>
            <preview className="preview">Preview content</preview>
            <sidebar className="sidebar">Sidebar content</sidebar>
            <backface className="backface">Backface content</backface>
          </PublishBoard>
        );

        component.onFlip();

        const node = TestUtils.findRenderedDOMComponentWithClass(component, 'PublishBoard');

        expect(node.classList[1]).to.equal('PublishBoard--flipped');
      });

      it('shouldn\'t flip when the backface is missing', () => {
        const component = TestUtils.renderIntoDocument(
          <PublishBoard {...requiredProps}>
            <preview className="preview">Preview content</preview>
            <sidebar className="sidebar">Sidebar content</sidebar>
          </PublishBoard>
        );

        component.onFlip();

        const node = TestUtils.findRenderedDOMComponentWithClass(component, 'PublishBoard');

        expect(node.classList.length).to.equal(1);
        expect(node.classList[0]).to.equal('PublishBoard');
      });
    });
  });
});
