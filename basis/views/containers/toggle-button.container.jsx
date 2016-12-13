import React, {Component} from 'react';
import {ToggleButton} from 'views/components/toggle-button';


export default class ToggleButtonContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  _changeCheckState() {
    this.setState({checked: !this.state.checked});
  }

  render() {
    const style = {padding: 10};

    return (
      <div style={style}>
        <h3>Toggle button component</h3>
        <ToggleButton
          checked={this.state.checked}
          onClick={this._changeCheckState.bind(this)} />
        <br />
        {this.state.checked ? 'CHECKED' : 'UNCHECKED'}
      </div>
    );
  }
}
