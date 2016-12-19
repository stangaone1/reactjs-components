// deps
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

// component to test
import { TabArea, Tab, TabContent } from 'views/components/tab-area';

// noop
const noop = () => {};

describe('TabArea', () => {
  // component default
  const DEFAULTS = {
    cssClass: 'TabArea',
  };

  // clear instance on each test
  let instance;
  afterEach(() => { instance = null; });

  //
  //  default class
  //
  it(`has correct default class (${DEFAULTS.cssClass})`, () => {
    instance = shallow(
      <TabArea onTabChange={noop} />
    );

    expect(instance.node.props.className).to.equal(DEFAULTS.cssClass);
  });

  //
  //  default rendering on no props
  //
  it('has correct rendering when no props', () => {
    instance = shallow(
      <TabArea onTabChange={noop} />
    );

    // tab items & content nodes
    const tabsNode = instance.node.props.children[1];
    const contentNode = instance.node.props.children[2];

    // tab items & content items lists
    const tabItemsList = tabsNode.props.children;
    const tabContentList = contentNode.props.children;

    expect(tabItemsList).to.be.empty;
    expect(tabContentList).to.be.empty;
  });

  //
  //  default rendering with props
  //
  it('has correct rendering with props', () => {
    instance = shallow(
      <TabArea
        onTabChange={noop}
        currentTab={1} />
    );

    expect(instance.unrendered.props.currentTab).to.equal(1);
  });


  //
  //  child node provided
  //
  it('renders child nodes in custom designated places', () => {
    instance = shallow(
      <TabArea onTabChange={noop}>
        <div>extra item</div>

        <Tab>tab #01</Tab>
        <Tab>tab #02</Tab>

        <TabContent>
          tab content #01
        </TabContent>
        <TabContent>
          tab content #02
        </TabContent>
      </TabArea>
    );

    // tab items nodes & list
    const tabsNode = instance.node.props.children[1];
    const tabItemsList = tabsNode.props.children;

    // tab content nodes & list
    const contentNode = instance.node.props.children[2];
    const tabContentList = contentNode.props.children;

    // extra items node & list
    const extraNode = instance.node.props.children[0];
    const extraItemsList = extraNode[0].props.children;

    // check for correct number of tabs & content items
    expect(tabItemsList).to.have.length.of(2);
    expect(tabContentList).to.have.length.of(2);

    // check for correct component types
    expect(tabItemsList[0].type).to.equal(Tab);
    expect(tabItemsList[1].type).to.equal(Tab);
    expect(tabContentList[0].type).to.equal(TabContent);
    expect(tabContentList[1].type).to.equal(TabContent);

    // check for correct props on tab items
    expect(tabItemsList[0].props.children).to.equal('tab #01');
    expect(tabItemsList[1].props.children).to.equal('tab #02');

    // check for correct props on tab contents
    expect(tabContentList[0].props.children).to.equal('tab content #01');
    expect(tabContentList[1].props.children).to.equal('tab content #02');

    // check for correct extra items
    expect(extraNode).to.have.length.of(1);
    expect(extraItemsList).to.equal('extra item');
  });
});
