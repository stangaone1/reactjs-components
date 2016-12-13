import React, {Component} from 'react';
import VideoSelector from 'views/components/video-selector';

export default class VideoSelectorContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      url: '',
    };

    this.handleToggle = this.onToggle.bind(this);
    this.handleChange = this.onChange.bind(this);
  }

  onToggle() {
    this.setState({open: !this.state.open});
  }

  onChange(url) {
    this.setState({url, open: false});
  }

  render() {
    return (
      <div>
        <VideoSelector
          onChange={this.handleChange}
          value={this.state.url}
          open={this.state.open}
          onClose={this.handleToggle}
        />
        <button
          onClick={this.handleToggle}
        >
          open
        </button>

        url : {this.state.url}
      </div>
    );
  }
}
