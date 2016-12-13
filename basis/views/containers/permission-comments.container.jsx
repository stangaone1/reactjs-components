import React, {Component} from 'react';
import PermissionComments from 'views/components/permission-comments';

export default class PermissionCommentsContainer extends Component {

  constructor() {
    super();
    this.state = {
      value: false,
    };
  }
  handleChange(value) {
    this.setState({value});
  }

  render() {
    return (
      <div>
        <PermissionComments
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        value: {JSON.stringify(this.state.value)}
      </div>
    );
  }
}
