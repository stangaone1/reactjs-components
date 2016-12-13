import React, {Component} from 'react';
import NoContent from 'views/components/no-content';

export default class NoContentContainer extends Component {
  render() {
    return (
      <div style={{height: 500, position: 'relative', width: 500, background: '#fff'}}>
      <NoContent
        className="Gallery-noContent"
        title="No photos found."
        text="Upload a photo or choose one from the recent gallery."
        icon="nophoto"/>
      </div>
    );
  }
}
