import React from 'react';
import {Tab, TabList} from 'views/components/tab-list';
import * as utils from '../../../utils/utils';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

describe('Components', () => {
  const component = utils.shallowlyRenderedOutput(
    <TabList disabledIndexes={[2]} selectedIndex={1}>
      <Tab selected>
        Tab1
      </Tab>
      <Tab title="Tab2" />
      <Tab>
        Tab4
      </Tab>
    </TabList>
  );

  describe('TabList', () => {
    it('should be rendered as div', () => {
      expect(component.type).to.equal('div');
    });

    it('should have class TabList', () => {
      expect(component.props.className).to.equal('TabList');
    });

    it('should contain children', () => {
      expect(typeof TestUtils.isElementOfType(component.props.children) !== 'undefined').to.be.true;
    });
  });

  const TabListNavigation = component.props.children;

  describe('TabListNavigation', () => {
    it('should be rendered as nav', () => {
      expect(TabListNavigation.type).to.equal('nav');
    });

    it('should have class TabList-Navigation', () => {
      expect(TabListNavigation.props.className).to.equal('TabList-Navigation');
    });

    it('should contain children', () => {
      expect(typeof TestUtils.isElementOfType(TabListNavigation.props.children) !== 'undefined').to.be.true;
    });
  });

  describe('TabListMenu', () => {
    const TabListMenu = TabListNavigation.props.children;

    it('should be rendered as ul', () => {
      expect(TabListMenu.type).to.equal('ul');
    });

    it('should have class TabList-Menu', () => {
      expect(TabListMenu.props.className).to.equal('TabList-Menu');
    });

    it('should contain children', () => {
      expect(typeof TestUtils.isElementOfType(TabListMenu.props.children) !== 'undefined').to.be.true;
    });

    it('should contain 3 tabs', () => {
      expect(TabListMenu.props.children.length).to.equal(3);
    });

    it('the 1st tab should not be selected', () => {
      expect(TabListMenu.props.children[0].props.selected).to.be.false;
    });

    it('the 2nd tab should be selected', () => {
      expect(TabListMenu.props.children[1].props.selected).to.be.true;
    });

    it('the 3rd tab should be disabled', () => {
      expect(TabListMenu.props.children[2].props.disabled).to.be.true;
    });
  });
});
