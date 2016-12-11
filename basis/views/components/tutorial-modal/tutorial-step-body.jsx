import React, {Component, PropTypes} from 'react';
import { ModalBody } from 'views/components/modal';

export default class extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  render() {
    return (
      <div className={this.props.className}>
        <ModalBody>{this.props.children}</ModalBody>
      </div>
    );
  }
}
