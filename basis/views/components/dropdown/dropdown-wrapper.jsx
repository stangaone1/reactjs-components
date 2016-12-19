import React, {Component} from 'react';
import listensToClickOutside from 'react-click-outside';

import Dropdown from './dropdown';

@listensToClickOutside
class DropdownWrapper extends Component {
  render() {
    return <Dropdown {...this.props}></Dropdown>
  }
}
export default DropdownWrapper;