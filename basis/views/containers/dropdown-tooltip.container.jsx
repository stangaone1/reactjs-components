import React, {Component} from 'react';
import DropdownTooltip from 'views/components/dropdown-tooltip';

export default class DropdownTooltipContainer extends Component {
  render() {
    return (
      <div>
        <DropdownTooltip size="small" label="short text">
          <div className="Dropdown-text">Hiring to win</div>
        </DropdownTooltip>
      </div>
    );
  }
}
