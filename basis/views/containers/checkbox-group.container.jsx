import React, {Component} from 'react';
import CheckboxGroup from 'views/components/checkbox-group';
import Checkbox from 'views/components/checkbox';

export default class CheckboxGroupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [false, true, false],
    };

    this._onItemChange = this._onItemChange.bind(this);
    this._onGroupChange = this._onGroupChange.bind(this);
  }

  _onItemChange(index) {
    const temp = this.state.values;
    temp[index] = !this.state.values[index];

    this.setState({
      values: temp,
    });
  }

  _onGroupChange() {
    this.setState({
      values: this.state.values.every((value) => value) ? [false, false, false] : [true, true, true],
    });
  }

  render() {
    return (
      <CheckboxGroup
        label="parentCheckbox"
        checked={this.state.values.every((value) => value)}
        partial={this.state.values.some((value) => value)}
        onChange={this._onGroupChange.bind(this)}
        className="testCheckboxGroup"
      >
        <Checkbox
          label="Checkbox label"
          checked={this.state.values[0]}
          onChange={this._onItemChange.bind(this, 0)}
        />
        <Checkbox
          label="Checkbox label"
          checked={this.state.values[1]}
          onChange={this._onItemChange.bind(this, 1)}
        />
        <Checkbox
          label="Checkbox label"
          checked={this.state.values[2]}
          onChange={this._onItemChange.bind(this, 2)}
        />
      </CheckboxGroup>
    );
  }
}
