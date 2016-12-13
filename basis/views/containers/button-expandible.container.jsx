import React, {Component} from 'react';
import ButtonExpandible from 'views/components/button-expandible';
import {Button} from 'views/components/buttons';


export default class ButtonExpandibleContainer extends Component {
  constructor() {
    super();
    this.state = {
      clicked: '',
    };
  }

  onButtonClick(button) {
    this.setState({
      clicked: button,
    });
  }

  render() {
    return (
      <div>
        <ButtonExpandible>
          <Button onClick={this.onButtonClick.bind(this, 'Delete')} block>
            Delete
          </Button>
          <Button onClick={this.onButtonClick.bind(this, 'Copy')} block>
            Copy
          </Button>
        </ButtonExpandible>
        <div>{this.state.clicked}</div>
      </div>
    );
  }
}
