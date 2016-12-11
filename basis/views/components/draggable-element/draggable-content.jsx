import React, {Component, PropTypes} from 'react';

export default class extends Component {
  static displayName = 'DraggableContent';

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="DraggableContent">
        {this.props.children}
      </div>
    );
  }
}
