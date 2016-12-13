import React, { Component, PropTypes } from 'react';
import {TabList, Tab, TabContentList, TabContent} from 'views/components/tab-list';

export default class TabsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex && this.state.selectedIndex !== nextProps.selectedIndex) {
      this.setState({
        selectedIndex: nextProps.selectedIndex,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.selectedIndex !== nextState.selectedIndex;
  }

  onTabChanged(tabIndex) {
    this.setState({
      selectedIndex: tabIndex,
    });
  }

  render() {
    return (
      <div>
        <TabList onTabChanged={this.onTabChanged.bind(this)}
              selectedIndex={this.state.selectedIndex}>
          <Tab>Tab 1</Tab>
          <Tab title="Tab 2"> tab 2</Tab>
          <Tab title="Tab 3"> tab 3</Tab>
        </TabList>
        <TabContentList selectedIndex={this.state.selectedIndex}>
          <TabContent>bbbbb</TabContent>
          <TabContent>
            <h2>AAAAA</h2>

            <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>

            <h2>AAAAA</h2>

            <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>

            <h2>AAAAA</h2>

            <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
          </TabContent>
          <TabContent>ccccc</TabContent>
        </TabContentList>
      </div>
    );
  }
}

TabsContainer.displayName = 'TabsContainer';
TabsContainer.propTypes = {
  selectedIndex: PropTypes.number,
};
