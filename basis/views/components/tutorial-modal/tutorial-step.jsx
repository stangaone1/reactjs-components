import React, {Component, PropTypes} from 'react';

export default class extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}
