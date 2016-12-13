
import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Radio from 'views/components/radio/radio';

export default class RadioContainer extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };

    this._onChange = this._onChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _onChange(value) {
    this.setState({
      checked: value,
    });
  }

  render() {
    return (
      <div>
        <Radio
          checked={this.state.checked}
          label="Radio label"
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

RadioContainer.displayName = 'RadioContainer';
