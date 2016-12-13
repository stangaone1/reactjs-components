import React from 'react';
import {Button} from 'views/components/buttons';

class ButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened1: false,
      opened2: false,
    };
  }

  toggleOpened1() {
    this.setState({opened1: !this.state.opened1});
  }
  toggleOpened2() {
    this.setState({opened2: !this.state.opened2});
  }

  render() {
    // styles for container component showcase
    const divStyle = {
      padding: 30,
      margin: 20,
      border: '1px solid black',
      display: 'inline-block',
      background: '#ffffff',
    };
    const divStyle2 = Object.assign({width: '600px'}, divStyle);

    return (
      <div>
        <div style={divStyle}>
          <h3>default</h3><br />
          <Button>Normal</Button>
          <Button type="main">Main</Button>
          <Button disabled>disabled</Button>
        </div>
        <br />
        <br />
        <div style={divStyle}>
          <h3>small</h3><br />
          <Button size="small">Actions</Button>
          <Button size="small" type="main">Main</Button>
          <Button size="small" disabled>disabled</Button>
        </div>
        <br />
        <br />
        <div style={divStyle}>
          <h3>selected</h3><br />
          <Button selected >Actions</Button>
          <Button selected type="main">Main</Button>
          <Button selected disabled>disabled</Button>
        </div>
        <br />
        <br />
        <div style={divStyle2}>
          <h3>centered</h3>
          <Button centered />
        </div>
        <br />
        <br />
        <div style={divStyle2}>
          <h3>block</h3><br />
          <Button block>Button</Button>
          <br />
        <Button block type="main">Main block</Button>
        </div>
        <br />
        <br />
        <div style={divStyle2}>
          <h3>dropdown</h3><br />
        <Button
          type="dropdown"
          opened={this.state.opened1}
          onClick={this.toggleOpened1.bind(this)}
        />
        <br />
        <br />
        Opened1 state: {this.state.opened1 ? 'Opened' : 'Closed'}
        <br />
        <br />
        <br />
        block
        <br />
        <br />
        <Button
          type="dropdown"
          opened={this.state.opened2}
          onClick={this.toggleOpened2.bind(this)}
          block
        />

        <br />
        Opened2 state: {this.state.opened2 ? 'Opened' : 'Closed'}
        </div>
      </div>
    );
  }
}

export default ButtonContainer;
