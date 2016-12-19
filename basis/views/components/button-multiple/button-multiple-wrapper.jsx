import React, {Component} from 'react';

import listensToClickOutside from 'react-click-outside';

import ButtonMultiple from './button-multiple.jsx';

@listensToClickOutside
class ButtonMultipleWrapper extends Component {
  render() {
    return <ButtonMultiple {...this.props}>{this.props.children}</ButtonMultiple>
  }
}
export default ButtonMultipleWrapper;