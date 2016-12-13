import React, {Component} from 'react';
import SwitchButton from 'views/components/switch-button';

export default class SwitchButtonContainer extends Component {
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
    return (
      <div>
        <h3>Switch button component</h3>
        <SwitchButton
          checked={this.state.checked}
          onChange={this._changeCheckState.bind(this)}
          leftLabel="left"
          rightLabel="right"
        />
        <br />
        {this.state.checked ? 'CHECKED' : 'UNCHECKED'}
      </div>
    );
  }
}
