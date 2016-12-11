import React, {Component, PropTypes} from 'react';

export default class extends Component {
  static propTypes = {
    connection: PropTypes.func,
  };

  onClick() {
    if (this.props.connection) {
      this.props.connection({from: 'draggable dummy', data: 'test test test'});
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick.bind(this)}>click me</button>
      </div>
    );
  }
}
