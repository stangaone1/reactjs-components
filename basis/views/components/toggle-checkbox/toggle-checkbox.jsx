import React, {Component, PropTypes} from 'react';
import Checkbox from 'views/components/checkbox/checkbox';
import ToggleButton from 'views/components/toggle-button/toggle-button';
import cx from 'classnames';

import './toggle-checkbox.scss';

class ToggleCheckbox extends Component {

  // events
  _onChange() {
    if ((this.props.onChange) && (!this.props.disabled)) {
      this.props.onChange();
    }
  }

  _onActivateFilter() {
    if ((this.props.onActivateFilter) && (this.props.checked)) {
      this.props.onActivateFilter();
    }
  }

  // react functions
  render() {
    const {className, checked, disabled, filterActive, label} = this.props;
    const ToggleCheckboxClasses = {
      'ToggleCheckbox': true,
      'disabled': disabled,
    };

    return (
      <div className={cx(ToggleCheckboxClasses, className)}>
        <Checkbox className="ToggleCheckbox-checkbox" disabled={disabled} checked={checked} label={label} onChange={this._onChange.bind(this)} />
        <ToggleButton className="ToggleCheckbox-button" disabled={!checked} checked={filterActive} onClick={this._onActivateFilter.bind(this)} />
      </div>
    );
  }
}

ToggleCheckbox.displayName = 'ToggleCheckbox';
ToggleCheckbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  filterActive: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onActivateFilter: PropTypes.func.isRequired,
};

export default ToggleCheckbox;
