import React, {Component} from 'react';

import listensToClickOutside from 'react-click-outside';

import DropDownSelector from './dropdown-selector';

@listensToClickOutside
class DropDownSelectorWrapper extends Component {
  render() {
    return <DropDownSelector {...this.props}></DropDownSelector>
  }
}
export default DropDownSelectorWrapper;