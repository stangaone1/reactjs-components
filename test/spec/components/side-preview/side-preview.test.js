import React from 'react';
import SidePreview from 'views/components/side-preview';
import * as utils from '../../../utils/utils';
import {expect} from 'chai';
import {spy} from 'sinon';
import { mount } from 'enzyme';

describe('SidePreview', () => {
  describe('container', () => {
    const side = utils.shallowlyRenderedOutput(
      <SidePreview className="customClass"/>
    );

    it('should render as div', () => {
      expect(side.type).to.equal('div');
    });

    it('should render with class SidePreview', () => {
      expect(side.props.className).to.include('SidePreview');
    });

    it('should render with custom class "customClass"', () => {
      expect(side.props.className).to.include('customClass');
    });
  });

  describe('behavior', () => {
    const onNextClick = spy();
    const onPrevClick = spy();
    const onEditClick = spy();
    const onQuickEditClick = spy();
    const onCustomActionClicked = spy();


    const side = mount(
      <SidePreview
        className="customClass"
        onNext={onNextClick}
        onPrev={onPrevClick}
        onEdit={onEditClick}
        onQuickEdit={onQuickEditClick}
        otherActions={[{
          label: 'customAction',
          action: onCustomActionClicked,
        }]}
      />
    );

    it('should call onNext when next button is clicked', () => {
      side.find('.NextPrev-nextButton').simulate('click');
      expect(onNextClick.called).to.be.true;
    });

    it('should call onPrev when prev button is clicked', () => {
      side.find('.NextPrev-prevButton').simulate('click');
      expect(onPrevClick.called).to.be.true;
    });

    const actionButtons = side.find('.SidePreview-actions');

    it('should call onEdit when Edit button is clicked', () => {
      actionButtons.find('.edit').simulate('click');
      expect(onEditClick.called).to.be.true;
    });

    it('should call onQuickEdit when QuickEdit button is clicked', () => {
      actionButtons.find('.quick-edit').simulate('click');
      expect(onQuickEditClick.called).to.be.true;
    });

    it('should render one other action button', () => {
      expect(actionButtons.find('.SidePreview-actions-others').length).to.equal(1);
    });

    it('should open dropdown on other button is clicked', () => {
      actionButtons.find('.Dropdown-button').simulate('click');
      expect(actionButtons.find('.DropdownMenu-item').length).to.equal(1);
    });

    it('should call custom action when other action items are clicked', () => {
      actionButtons.find('.DropdownMenu-item').simulate('click');
      expect(onCustomActionClicked.called).to.be.true;
    });
  });
});
