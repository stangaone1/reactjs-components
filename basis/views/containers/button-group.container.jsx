import React from 'react';
import {Button, ButtonGroup} from 'views/components/buttons';

class ButtonGroupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      openedIndex: -1,
    };
  }

  // callback methods provides new index. Post-selection logic goes here
  changeIndex(newIndex) {
    this.setState({
      selectedIndex: (newIndex === undefined) ? -1 : newIndex,
    });
  }

  changeOpened(newOpened) {
    this.setState({
      openedIndex: (newOpened === this.state.openedIndex) ? -1 : newOpened,
    });
  }

  render() {
    const divStyle = {
      padding: 30,
      margin: 20,
      border: '1px solid black',
      display: 'inline-block',
      background: '#ffffff',
      width: 700,
    };
    return (
      <div>
        <div style={divStyle}>
          <h3>ButtonGroup component (selected index {this.state.selectedIndex})</h3>
          <ButtonGroup
            onIndexChange={this.changeIndex.bind(this)}
            selectedIndex={this.state.selectedIndex}
          >
            <Button>short</Button>
            <Button>longest name of all</Button>
            <Button>in the middle</Button>
          </ButtonGroup>
        </div>
        <div style={divStyle}>
          <h3>ButtonGroup component disabled</h3>
          <ButtonGroup
            disabled
          >
            <Button>short</Button>
            <Button>longest name of all</Button>
            <Button>in the middle</Button>
          </ButtonGroup>
        </div>
        <div style={divStyle}>
          <h3>ButtonGroup component centered (opened index {this.state.openedIndex})</h3>
          <ButtonGroup
            centered
            buttonsType="dropdown"
            onIndexChange={this.changeOpened.bind(this)}
            selectedIndex={this.state.openedIndex}
          >
            <Button>Option 1</Button>
            <Button>Option long option 2</Button>
            <Button>Option 3</Button>
          </ButtonGroup>
          <br /><br />
          <ButtonGroup
            centered
            buttonsType="dropdown"
            onIndexChange={this.changeOpened.bind(this)}
            selectedIndex={this.state.openedIndex}
          >
            <Button>view</Button>
            <Button>sort</Button>
            <Button>filter</Button>
          </ButtonGroup>
        </div>
        <div style={divStyle}>
          <h3>ButtonGroup component - block - (same selection/opened state as above)</h3>
          <ButtonGroup
            block
            onIndexChange={this.changeIndex.bind(this)}
            selectedIndex={this.state.selectedIndex}
          >
            <Button>short</Button>
            <Button>longest name of all</Button>
            <Button>in the middle</Button>
          </ButtonGroup>
          <br />
          <ButtonGroup
            buttonsType="dropdown"
            onIndexChange={this.changeOpened.bind(this)}
            selectedIndex={this.state.openedIndex}
            block
          >
            <Button>Option 1</Button>
            <Button>Option long option 2</Button>
            <Button>Option 3</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default ButtonGroupContainer;
