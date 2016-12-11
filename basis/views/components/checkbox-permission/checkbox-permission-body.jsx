import React, {Component, PropTypes} from 'react';

import Checkbox from 'views/components/checkbox/checkbox';

import './checkbox-permission.scss';

export default class PermissionCheckboxBody extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    checked: false,
  };

  onOptionsChange(index) {
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  }

  render() {
    return (
      <div className="Permission-dropdownBody">
        <ul className="Permission-dropdownMenu">
          {
            this.props.options.map((item, index) => {
              return (
                <li className="Dropdown-menuItem" key={index}>
                  <Checkbox
                    disabled={!this.props.checked || this.props.options[index].disabled}
                    checked={this.props.options[index].checked}
                    label={this.props.options[index].name}
                    onChange={this.onOptionsChange.bind(this, index)}
                  />
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
