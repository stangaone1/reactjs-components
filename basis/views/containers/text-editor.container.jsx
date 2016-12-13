import React, {Component} from 'react';
import TextEditor from 'views/components/text-editor';

export default class TextEditorContainer extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(value) {
    this.setState({
      value: value,
    });
  }

  render() {
    return (
      <div>
        <TextEditor
          value={this.state.value}
          onChange={this.onTextChange}
        />
      </div>
    );
  }
}
