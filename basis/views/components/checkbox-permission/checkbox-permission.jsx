import React, {Component, PropTypes} from 'react';

import cx from 'classnames';

import Checkbox from 'views/components/checkbox/checkbox';
import PermissionCheckboxBody from './checkbox-permission-body';

import './checkbox-permission.scss';

export default class PermissionCheckbox extends Component {

  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.node.isRequired,
    options: PropTypes.array.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    onToggle: PropTypes.func,
    stretched: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    checked: false,
    stretched: false,
    disabled: false,
  };

  onPermissionActivate() {
    if (this.props.onToggle) {
      this.props.onToggle(!this.props.checked);
    }
  }

  render() {
    const { className, disabled } = this.props;

    const containerClasses = cx({
      'Permission-checkbox': !this.props.stretched,
      'Permission-checkbox--stretched': this.props.stretched,
    }, className);

    return (
      <div className={containerClasses}>
        <Checkbox
          disabled={disabled}
          checked={this.props.checked}
          label={this.props.label}
          className="PermissionCheckbox-allowUserComments"
          onChange={this.onPermissionActivate.bind(this)}
        />
        <PermissionCheckboxBody
          options={this.props.options}
          onChange={this.props.onChange}
          checked={this.props.checked}
        />
      </div>
    );
  }
}
