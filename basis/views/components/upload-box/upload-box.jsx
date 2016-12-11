import React, {Component, PropTypes} from 'react';
import { DropTarget as dropTarget } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import cx from 'classnames';
import {getMimeTypesForExtension, getFileContents} from 'lib/utils/fileHandling';

import {Button} from 'views/components/buttons';
import Icon from 'views/components/icon';

import './upload-box.scss';

const fileTarget = {
  drop(props, monitor, component) {
    const file = monitor.getItem().files[0];
    component.onFileAdd(file);
  },
};

@dropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))
class UploadBox extends Component {
  static propTypes = {
    accept: PropTypes.array,
    className: PropTypes.string,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool,
    disclaimer: PropTypes.string,
    error: PropTypes.string,
    file: PropTypes.object,
    internalTexts: PropTypes.object,
    maxSize: PropTypes.number,
    onFileAdd: PropTypes.func.isRequired,
    onFileRemove: PropTypes.func,
    onFileError: PropTypes.func,
    children: PropTypes.node,
    imagePreview: PropTypes.bool,
    hideUploadFileWhenOk: PropTypes.bool,
    label: PropTypes.node,
  };

  static defaultProps = {
    imagePreview: false,
    label: 'Choose file',
    children: (<span>Drag your files here <em>or</em></span>),
  };


  constructor(props) {
    super(props);
    this.handleButtonClick = this.onButtonClick.bind(this);
    this.handleInputChange = this.onInputChange.bind(this);
    this.handleFileRemove = this.onFileRemove.bind(this);
  }

  // react methods
  componentWillMount() {
    const { file } = this.props;

    this.setState({
      file: null,
      binaryFile: file ? {
        name: `${file.public_id}.${file.format}`,
        size: !isNaN(file.bytes) ? parseInt(file.bytes, 10) : 0,
      } : null,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      const currentState = this.state;

      currentState.error = nextProps.error;
      currentState.file = null;
      currentState.binaryFile = null;
      this.setState(currentState);
    }
  }

  // events
  onButtonClick(ev) {
    ev.preventDefault();
    this.refs.UploadBoxFile.click();
  }

  onInputChange(ev) {
    if (ev.target.files && ev.target.files[0]) {
      this.onFileAdd(ev.target.files[0], ev);
    }
  }

  onFileAdd(file) {
    getFileContents(file, this.props.accept, this.props.maxSize).then(
      (response) => {
        this.setState({
          file: response.file,
          binaryFile: response.binaryFile,
          error: null,
        });

        if (this.props.onFileAdd) {
          this.props.onFileAdd(response);
        }
      },
      (errorResponse) => {
        this.setState({
          file: null,
          binaryFile: null,
          error: errorResponse.error,
        });

        if (this.props.onFileError) {
          this.props.onFileError(errorResponse.error);
        }
      });
  }

  onFileRemove() {
    this.setState({
      file: null,
      binaryFile: null,
      error: null,
    });

    if (this.props.onFileRemove) {
      this.props.onFileRemove({
        file: null,
        binaryFile: null,
      });
    }
  }

  clear() {
    this.setState({
      file: null,
      binaryFile: null,
      error: null,
    });
  }

  // public methods
  getFile() {
    return this.state.file;
  }

  getBinaryFile() {
    return this.state.binaryFile;
  }

  isFileImage() {
    return this.props.imagePreview && this.state.file && /^data:image\/(png|jpe?g|bmp|gif)/.test(this.state.file);
  }

  renderFileInfo() {
    if (this.state.error) {
      return (
        <div className="UploadBox-fileInfo">
          <p className="UploadBox-fileInfoError">{this.state.error}</p>
          <button className="UploadBox-fileInfoCloseIcon" onClick={this.handleFileRemove}>
            <Icon name="close"/>
          </button>
        </div>
      );
    }

    if (this.isFileImage()) {
      return (
        <div className="UploadBox-imageWrapper">
          <img className="UploadBox-image" src={this.state.file}/>
          <button className="UploadBox-fileInfoCloseIcon" onClick={this.handleFileRemove}>
            <Icon name="close"/>
          </button>
        </div>
      );
    }

    if (this.state.binaryFile) {
      return (
        <div className="UploadBox-fileInfo">
          <Icon className="UploadBox-fileInfoIcon" name="attachment"/>
          <p className="UploadBox-fileInfoName">{this.state.binaryFile.name}</p>
          <p className="UploadBox-fileInfoSize">{Math.ceil(this.state.binaryFile.size / 1024)}kb</p>
          <button className="UploadBox-fileInfoCloseIcon" onClick={this.handleFileRemove}>
            <Icon name="close"/>
          </button>
        </div>
      );
    }

    return null;
  }

  renderDisclaimer() {
    const { disclaimer, imagePreview } = this.props;
    const { file, binaryFile} = this.state;

    if (disclaimer && !imagePreview && file && binaryFile) {
      return (
        <p className="UploadBox-Disclaimer">
          {disclaimer}
        </p>
      );
    }
  }

  renderUploadButton() {
    if (!this.props.hideUploadFileWhenOk || !this.state.file) {
      return (
        <Button className="UploadBox-button" onClick={this.handleButtonClick}>{this.props.label}</Button>
      );
    }
  }

  render() {
    const {
      accept,
      className,
      children,
      connectDropTarget,
      isOver,
      label,
      ...props,
    } = this.props;

    const UploadBoxClasses = {
      'UploadBox': true,
      'UploadBox--error': this.state.error,
      'UploadBox--dragover': isOver,
      'UploadBox--file': this.state.file || this.state.binaryFile,
      'UploadBox--fileImage': this.isFileImage(),
    };

    let acceptedTypes = getMimeTypesForExtension(accept);
    acceptedTypes = acceptedTypes.length ?
      acceptedTypes.map(item => item.mimeType).join(',') : '';

    return connectDropTarget(
      <div {...props} className={cx(UploadBoxClasses, className)}>
        <div className="UploadBox-dropzone">
          <div className="UploadBox-content">
            {this.renderFileInfo()}
            <div className="UploadBox-contentControls">
              <div className="UploadBox-contentDescription">
                {children}
              </div>
              <div className="UploadBox-controls">
                {this.renderUploadButton()}
                {this.renderDisclaimer()}
              </div>
            </div>
          </div>
        </div>
        <input
          className="UploadBox-file"
          ref="UploadBoxFile"
          type="file"
          value=""
          onChange={this.handleInputChange}
          accept={acceptedTypes}
        />
      </div>
    );
  }
}

export default UploadBox;
