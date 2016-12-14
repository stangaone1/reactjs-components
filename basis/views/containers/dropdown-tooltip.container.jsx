import React, {Component} from 'react';
import DropdownTooltip from 'views/components/dropdown-tooltip';

export default class DropdownTooltipContainer extends Component {
  render() {
    return (
      <div style={{marginLeft:300}}>
        <DropdownTooltip size="small" label="short text">
          <div className="Dropdown-text">Some tooltip</div>
        </DropdownTooltip>
      </div>
    );
  }
}
