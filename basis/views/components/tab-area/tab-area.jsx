// deps
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import invariant from 'invariant';
import {flatten} from 'lodash';
// components
import { Tab, TabList, TabContentList, TabContent } from 'views/components/tab-list';
import TabListAside from './tab-list-aside';
import restrictedCompare from 'lib/utils/restricted-compare';

// style
import './tab-area.scss';

class TabArea extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    className: PropTypes.string,
    renderHidden: PropTypes.bool,
    currentTab: PropTypes.number.isRequired,
    onTabChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    currentTab: 0,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return restrictedCompare(this, nextProps, nextState);
  }

  onTabChange(tabIndex) {
    const {onTabChange} = this.props;
    if (onTabChange) {
      onTabChange(tabIndex);
    }
  }

  checkType(elements, childType) {
    const elems = flatten(elements);
    return elems.filter((child) => {
      return child.type === childType;
    });
  }

  getChildOfType(childType) {
    // need childType
    invariant(childType, 'Need child type bro!');

    // get children
    const { children = [] } = this.props;
    // map elements and check for needed type
    return this.checkType(children, childType);
  }

  getExtraChildrens() {
    // get children
    const { children = [] } = this.props;

    // map extra elements
    const extraElementsList = flatten(children).filter((child) => {
      if (child.type === Tab || child.type === TabContent || child.type === TabListAside) {
        return false;
      }

      return true;
    });

    return flatten(extraElementsList);
  }

  getTabItems() {
    return this.getChildOfType(Tab);
  }

  getTabContents() {
    return this.getChildOfType(TabContent);
  }

  getAsideItems() {
    return this.getChildOfType(TabListAside);
  }

  renderTabListAside() {
    const asideItemsList = this.getAsideItems();
    invariant(!asideItemsList || !(asideItemsList && asideItemsList.length > 1),
      'There can be only one aside item per tab area');

    if (asideItemsList.length && asideItemsList.length === 1) {
      return asideItemsList[0];
    }
  }

  render() {
    const { currentTab, renderHidden, className, children, ...props } = this.props;

    // map tabs, contents and extra items
    const tabItemsList = this.getTabItems();
    const tabContentList = this.getTabContents();
    const extraItemsList = this.getExtraChildrens();

    return (
      <div className={cx('TabArea', className)} {...props}>
        {extraItemsList}

        {this.renderTabListAside()}

        {/* TAB buttons */}
        <TabList
          onTabChanged={this.onTabChange.bind(this)}
          selectedIndex={currentTab}
        >
          {tabItemsList}
        </TabList>

        {/* TAB panels */}
        <TabContentList renderHidden={renderHidden} selectedIndex={currentTab}>
          {tabContentList}
        </TabContentList>
      </div>
    );
  }
}

// expose
export default {
  TabArea,
  Tab,
  TabContent,
  TabListAside,
};
