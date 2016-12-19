import React, {Component} from 'react';

import listensToClickOutside from 'react-click-outside';

import ButtonExpandible from './button-expandible';

@listensToClickOutside
class ButtonExpandibleWrapper extends Component {
  render() {
    return <ButtonExpandible {...this.props}></ButtonExpandible>
  }
}
export default ButtonExpandibleWrapper;