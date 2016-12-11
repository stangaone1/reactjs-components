import React, { Component, PropTypes } from 'react';
import InputField from 'views/components/inputfield';
import shallowCompare from 'react-addons-shallow-compare';

import Icon from 'views/components/icon';

export default class DropdownListSearch extends Component {
  static propTypes = {
    onSearch: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
  };

  shouldComponentUpdate(nextProps) {
    return shallowCompare(this, nextProps);
  }

  onChange(value) {
    if (this.props.onSearch) {
      this.props.onSearch(value.trim());
    }
  }

  render() {
    const inputIcon = <Icon name="search" />;

    return (
      <form className="DropdownList-Search-Container">
        <InputField
          placeholder={this.props.label}
          value={this.props.value}
          onChange={this.onChange.bind(this)}
          debounceTimeout={300}
          iconLeft={inputIcon}
        />
      </form>
    );
  }
}
