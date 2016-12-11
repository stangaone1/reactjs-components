import React, { Component, PropTypes } from 'react';

export default class extends Component {
  static displayName = 'TabListAside';

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="TabList-aside">{this.props.children}</div>
    );
  }
}
