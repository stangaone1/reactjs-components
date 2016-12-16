import React, { Component, PropTypes } from 'react';
import Tag from 'views/components/tag';

export default class TabsContainer extends Component {
  render() {
    return (
      <div>
        <Tag text="some tag"/>
        <Tag text="some other tag" removable/>
      </div>
    );
  }
}

TabsContainer.displayName = 'TabsContainer';
TabsContainer.propTypes = {
  selectedIndex: PropTypes.number,
};
