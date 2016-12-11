import React, {Component, PropTypes} from 'react';
import {UploadBox} from 'views/components/upload-box';
import Icon from 'views/components/icon/icon';
import cx from 'classnames';
import './new-photo.scss';

export default class NewPhoto extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    children: PropTypes.node,
    iconName: PropTypes.string,
    accept: PropTypes.arrayOf(PropTypes.string),
    maxSize: PropTypes.number,
    imagePreview: PropTypes.bool,
    label: PropTypes.string,
    className: PropTypes.string,
    gallery: PropTypes.object,
    actions: PropTypes.object,
    section: PropTypes.string,
    hint: PropTypes.string,
  };

  static defaultProps = {
    children: 'Drag and drop your photo here',
    iconName: 'photo',
    maxSize: 1024,
    imagePreview: true,
    label: 'Choose image to upload',
    accept: ['.jpg', '.bmp', '.png', '.jpeg', '.gif'],
    hint: 'Recommended size: 1600x900px, 16:9 ratio',
  };

  constructor(props) {
    super(props);

    this.uploadFile = this.uploadFile.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gallery.newPhoto) {
      if (this.props.gallery.newPhoto !== nextProps.gallery.newPhoto) {
        this.props.onSelect(nextProps.gallery.newPhoto);
      }
    }
  }

  uploadFile(file) {
    this.props.actions.uploadPhoto(this.props.section, file);
  }

  render() {
    const {children, className, iconName, onSelect, ...props} = this.props;

    return (
      <UploadBox
        {...props}
        onFileAdd={this.uploadFile}
        className={cx('ChoosePhoto-uploadBox', className)}
      >
        <Icon name={iconName} className="Icon--uploadPhoto"/>
          <span className="ChoosePhoto-uploadTitle">
            {children}
          </span>
          <p>{this.props.hint}</p>
      </UploadBox>
    );
  }
}
