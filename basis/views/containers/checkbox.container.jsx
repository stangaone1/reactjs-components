import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Checkbox from 'views/components/checkbox/checkbox';

export default class CheckboxContainer extends Component {
  constructor() {
    super();
    this.state = {
      checked: true,
    };
    this._onChange = this._onChange.bind(this);
  }

  _onChange(isChecked) {
    this.setState({
      checked: isChecked,
    });
  }

  render() {
    console.log('this.state.checked.', this.state)
    return (
      <div>
        <Checkbox
          checked={this.state.checked}
          label="Checkbox label"
          onChange={this._onChange}
          required
          className="testClass"
        />
        <br /><br />
        <span>{'Checked: ' + this.state.checked.toString()}</span>
      </div>
    );
  }
}

CheckboxContainer.displayName = 'CheckboxContainer';

