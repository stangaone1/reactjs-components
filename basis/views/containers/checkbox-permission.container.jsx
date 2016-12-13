import React, {Component} from 'react';
import CheckboxPermission from 'views/components/checkbox-permission';

export default class PermissionCheckboxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionActive: false,
      optionsList: [
        {name: 'From registered users only', checked: true},
        {name: 'Comments must be approved first', checked: false, disabled: true},
      ],
    };
  }

  _onToggle() {
    this.setState({ permissionActive: !this.state.permissionActive });
  }

  _onChange(option) {
    const {optionsList} = this.state;
    const newOptions = [...optionsList];
    newOptions[option].checked = !newOptions[option].checked;
    this.setState({ optionsList: newOptions });
  }

  render() {
    return (
      <div>
        <CheckboxPermission
          label="Allow user comments"
          checked={this.state.permissionActive}
          options={this.state.optionsList}
          onToggle={this._onToggle.bind(this)}
          onChange={this._onChange.bind(this)}
        />
      </div>
    );
  }
}
