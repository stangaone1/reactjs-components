import React, {Component} from 'react';

import listensToClickOutside from 'react-click-outside';

import ButtonMultiple from './button-multiple.jsx';

@listensToClickOutside
class ButtonMultipleWrapper extends Component {
  render() {
    return <ButtonExpandible {...this.props}></ButtonExpandible>
  }
}
export default ButtonMultipleWrapper;