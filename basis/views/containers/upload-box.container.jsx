import React, { Component } from 'react';
import {UploadBox} from 'views/components/upload-box';

export default class UploadBoxContainer extends Component {
  _onFileAdd(file) {
    console.log('add file triggered', file);

    // ajax should happen here
  }

  render() {
    return (
      <div>
        <UploadBox
          label="Upload employee photo"
          maxSize={1024}
          onFileAdd={this._onFileAdd.bind(this)}
          disclaimer="Before adding an image to a slide, make sure you have digital rights or permission to use the uploaded picture"
          >
          custom file descriptor here!
          <br/>
          this will <strong>not show</strong>  a preview if file is an image
          <br/>
          drag and drop file or
        </UploadBox>
        <br/>
        <br/>
        <UploadBox
          style={{height: '300px'}}
          label="Upload employee photo"
          maxSize={1024}
          imagePreview
          onFileAdd={this._onFileAdd.bind(this)}
          >
          custom file descriptor here!
          <br/>
          this will <strong>show</strong> a preview if file is an image
          <br/>
          drag and drop file or
        </UploadBox>
        <UploadBox
          style={{height: '300px'}}
          label="Upload employee photo"
          maxSize={1024}
          accept={['.jpg', ',bmp']}
          onFileAdd={this._onFileAdd.bind(this)}
          imagePreview>
          custom file descriptor here!
          <br/>
          this will <strong>show</strong> a preview if file is an image
          <br/>
          It will only accepts jpg and bmp files
          <br/>
          drag and drop file or
        </UploadBox>
      </div>
    );
  }
}
