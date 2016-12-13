import React, {Component} from 'react';
import InputMultipleAuthors from 'views/components/input-multiple-authors';

export default class InputMultipleAuthorsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [{}],
      disabled: true,
    };
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  }

  render() {
    return (
      <div>
        <h3>Input field multiple authors</h3>
        <InputMultipleAuthors
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        <br/>
          value: {JSON.stringify(this.state.value)}
      </div>
  );
  }
  }
