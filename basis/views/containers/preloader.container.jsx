import React, {Component} from 'react';
import Preloader from 'views/components/preloader';

export default class PreloaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busy: false,
    };
  }

  onSave() {
    console.log('saving changes!!!');

    this.setState({
      busy: !this.state.busy,
    });
  }

  render() {
    return (
      <div>
        <Preloader
          busy={this.state.busy}
          onClick={this.onSave.bind(this)}

          title="Install"
          pending="Installing..." />
      </div>
    );
  }
}
