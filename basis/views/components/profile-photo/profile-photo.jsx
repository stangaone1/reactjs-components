import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import UserDefaultPhoto from 'assets/images/test.jpg';
import ChooseUserPhoto from './choose-photo';

import './profile-photo.scss';

export default class ProfilePhoto extends Component {
  static propTypes = {
    className: PropTypes.string,
    photoClassName: PropTypes.string,
    children: PropTypes.node,
    defaultPhoto: PropTypes.string,
    editable: PropTypes.bool,
    image: PropTypes.object,
    imageURI: PropTypes.object,
    section: PropTypes.string.isRequired,
  };

  static defaultProps = {
    defaultPhoto: UserDefaultPhoto,
    editable: false,
    image: {
      value: null,
      onChange: () => {
      },
    },
    imageURI: {
      value: null,
      onChange: () => {
      },
    },
  };

  constructor() {
    super();
    this.state = {
      photo: null,
    };
    this.onPhotoUpload = this.onPhotoUpload.bind(this);
  }

  componentWillMount() {
    const {image} = this.props;
    if (image && image.initialValue) {
      this.setState({
        photo: image.initialValue,
      });
      image.onChange(image.initialValue.id);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onPhotoUpload(file) {
    const {
      imageURI,
      image,
      } = this.props;

    imageURI.onChange(file.path);
    image.onChange(file.id);
    this.setState({
      photo: file,
    });
  }

  renderPhoto() {
    const {
      defaultPhoto,
      photoClassName,
      editable,
      imageURI,
      } = this.props;

    let {photo} = this.state;

    const classes = cx('ProfilePhoto-photo', {
      'ProfilePhoto-defaultPhoto': !photo,
    }, photoClassName);

    if (!editable && imageURI) {
      if (typeof imageURI === 'string') {
        photo = {
          path: imageURI,
        };
      } else {
        photo = {
          path: imageURI.initialValue || imageURI.value || null,
        };
      }
    }

    return (
      <div className={classes} style={{backgroundImage: `url(${photo ? photo.path : defaultPhoto})`}}/>
    );
  }

  renderPhotoChange() {
    const {
      editable,
      section,
      } = this.props;

    if (editable) {
      return (
        <ChooseUserPhoto section={section} onPhotoUpload={this.onPhotoUpload}/>
      );
    }
  }

  render() {
    const {className, children, ...props} = this.props;
    const componentClasses = cx('ProfilePhoto', className);

    return (
      <div className={componentClasses} {...props}>
        {this.renderPhoto()}
        {this.renderPhotoChange()}
        {children}
      </div>
    );
  }
}

