import React, {Component, PropTypes} from 'react';
import { ModalHeader } from 'views/components/modal';

export default class extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>
        <ModalHeader>{this.props.children}</ModalHeader>
      </div>
    );
  }
}
