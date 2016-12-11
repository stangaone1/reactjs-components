import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import WidgetHeader from '../widget-header.jsx';
import WidgetContent from '../widget-content.jsx';
import VideoSelector, {getVideo} from 'views/components/video-selector/video-selector.jsx';
import {Button} from 'views/components/buttons';
import Checkbox from 'views/components/checkbox';
import InputField from 'views/components/inputfield';

import '../content-widget.scss';

export default class VideoWidget extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    defaultValue: PropTypes.object,
    toolbar: PropTypes.array,
  };

  static defaultProps = {
    value: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showCaption: false,
      caption: '',
      video: {},
    };

    this.handleModalOpen = this.onModalOpen.bind(this);
    this.handleModalClose = this.onModalClose.bind(this);
    this.handleChange = this.onChange.bind(this);
    this.handleShowCaption = this.onShowCaption.bind(this);
    this.handleCaptionChange = this.onCaptionChange.bind(this);
  }

  componentWillMount() {
    const value = this.props.value || this.props.defaultValue;
    if (value && value.gallery && value.gallery.path) {
      this.setState({
        video: getVideo(value.gallery.path),
      });
    }

    if (value) {
      this.setState({
        caption: value.caption || '',
        showCaption: value.showCaption || false,
      });
    }
    if (value.gallery) {
      this.onChange(value.gallery);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onShowCaption() {
    this.setState({showCaption: !this.state.showCaption}, () => {
      if (this.props.onChange) {
        this.props.onChange({
          showCaption: this.state.showCaption,
          caption: this.state.caption,
          gallery: this.state.gallery,
        });
      }
    });
  }

  onModalClose() {
    this.setState({open: false});
  }

  onCaptionChange(value) {
    this.setState({caption: value});

    if (this.props.onChange) {
      this.props.onChange({
        showCaption: this.state.showCaption,
        caption: value,
        gallery: this.state.gallery,
      });
    }
  }

  onModalOpen() {
    this.setState({open: true});
  }

  onChange(gallery) {
    let newState;

    if (gallery.cdn.source === 'upload') {
      newState = {
        video: {
          url: gallery.path,
        },
        gallery: gallery,
        isVideoUploaded: true,
      };
    } else {
      newState = {
        video: getVideo(gallery.path),
        gallery: gallery,
        isVideoUploaded: false,
      };
    }

    this.setState(newState, () => {
      this.onModalClose();
      if (this.props.onChange) {
        this.props.onChange({
          showCaption: this.state.showCaption,
          caption: this.state.caption,
          gallery: gallery,
        });
      }
    });
  }

  renderCaption() {
    if (this.state.showCaption) {
      return (
        <InputField
          value={this.state.caption}
          onChange={this.handleCaptionChange}
        />
      );
    }
  }

  renderPreview() {
    if (this.state.video) {
      if (this.state.isVideoUploaded) {
        return (
          <video className="PublishingPlatformWidget-videoPreview" src={this.state.video.url} type="video/mp4"
                 controls/>
        );
      }
      return (
        <iframe
          src={this.state.video.iframe}
          className="PublishingPlatformWidget-videoPreview"
        >
        </iframe>
      );
    }
  }

  render() {
    const {
      className,
      children,
      onChange,
      onRemove,
      defaultValue,
      value,
      ...props,
    } = this.props;

    const componentClasses = cx('PublishingPlatformWidget-video', {
      'PublishingPlatformWidget-video--hasValue': this.state.video && this.state.video.url,
      'PublishingPlatformWidget-video--noValue': !(this.state.video && this.state.video.url),
    }, className);

    return (
      <div {...props} className={componentClasses}>
        <WidgetHeader onRemove={onRemove}>
          <label>Video</label>
          <Button size="small" onClick={this.handleModalOpen}>
            Choose video
          </Button>

          <Checkbox
            label="Show caption"
            checked={this.state.showCaption}
            onClick={this.handleShowCaption}
          />
        </WidgetHeader>

        <WidgetContent>
          <VideoSelector
            onChange={this.handleChange}
            value={this.state.video}
            videoGallery={this.props.videoGallery}
            getRecentVideoGallery={this.props.getRecentVideoGallery}
            uploadVideo={this.props.uploadVideo}
            open={this.state.open}
            onClose={this.handleModalClose}
          />
          {this.renderPreview()}
          {this.renderCaption()}
        </WidgetContent>
      </div>
    );
  }
}
