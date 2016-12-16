import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import Modal, {ModalHeader, ModalBody, ModalFooter} from 'views/components/modal';
import GalleryPhotos from 'views/components/gallery';
import { TabArea, Tab, TabContent } from 'views/components/tab-area';
import {Button} from 'views/components/buttons';
import InputField from 'views/components/inputfield';
import Icon from 'views/components/icon/icon';
import NoContent from 'views/components/no-content';
import {UploadBox} from 'views/components/upload-box';
import noThumb from './no-thumb.png';
import {isEmpty} from 'lodash';

import './video-selector.scss';
export function getYoutubeVideoId(url) {
  if (!url || !url.length) {
    return null;
  }

  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
}

export function getVimeoVideoId(url) {
  if (!url || !url.length) {
    return null;
  }

  const regExp = /(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
  const match = url.match(regExp);
  if (match && match[5].length) {
    return match[5];
  }
}

export function getVideo(url) {
  const youtube = getYoutubeVideoId(url);
  if (youtube) {
    return {
      url: url,
      id: youtube,
      source: 'youtube',
      thumbnail: `http://img.youtube.com/vi/${youtube}/0.jpg`,
      iframe: `https://www.youtube.com/embed/${youtube}`,
    };
  }

  const vimeo = getVimeoVideoId(url);
  if (vimeo) {
    return {
      url: url,
      id: vimeo,
      source: 'vimeo',
      thumbnail: `https://i.vimeocdn.com/video/${vimeo}_640.webp`,
      iframe: `https://player.vimeo.com/video/${vimeo}`,
    };
  }
}

export default class VideoSelector extends Component {
  static propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    getRecentVideoGallery: PropTypes.func,
    uploadVideo: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    videoGallery: PropTypes.any,
    section: PropTypes.string,
  };

  static defaultProps = {
    section: 'publishing',
    videoGallery: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
      video: props.value || {},
      videoList: [],
      isChooseButtonDisabled: true,
    };

    this.handleTabChange = this.onTabChange.bind(this);
    this.handleUrlChange = this.onUrlChange.bind(this);
    this.handleClearVideo = this.clearVideo.bind(this);
    this.handleGalleryVideoSelected = this.onGalleryVideoSelected.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleChoose = () => {
      if (!this.state.gallery) {
        this.props.uploadVideo(this.props.section, {file: this.state.video.url}).then(() => {
          this.props.onChange(this.props.videoGallery.newVideo);
        });
      } else {
        this.props.onChange(this.state.gallery);
      }
    };
  }

  componentWillMount() {
    if (this.props.getRecentVideoGallery) {
      this.props.getRecentVideoGallery(this.props.section);
    }

    if (!isEmpty(this.props.value)) {
      this.onGalleryVideoSelected(this.props.value);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }


  onTabChange(tabIndex) {
    this.setState({
      currentTab: tabIndex,
      video: {},
      gallery: null,
      isChooseButtonDisabled: true,
    });
  }

  onUrlChange(value) {
    let url;

    if (typeof value === 'string') {
      url = value;
    }

    if (value && value.target) {
      url = value.target.value;
    }

    this.setState({
      video: getVideo(url),
      gallery: null,
      isChooseButtonDisabled: false,
    });
  }

  onGalleryVideoSelected(video) {
    this.setState({
      video: getVideo(video.url),
      gallery: video,
      isChooseButtonDisabled: false,
    });
  }

  clearVideo() {
    this.setState({
      video: {},
      gallery: null,
      isChooseButtonDisabled: true,
    });
  }

  uploadFile(file) {
    const data = new FormData();
    data.append('file', file.binaryFile);
    if (this.props.uploadVideo) {
      this.props.uploadVideo(this.props.section, data, true).then(() => {
        this.setState({
          video: this.props.videoGallery.newVideo,
          gallery: this.props.videoGallery.newVideo,
          isChooseButtonDisabled: false,
        });
      });
    }
  }

  renderNewVideoTab() {
    if (this.state.video && this.state.video.url) {
      return (
        <TabContent className="VideoSelector-newVideo">
          <iframe
            src={this.state.video.iframe}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullscreen
          ></iframe>
        </TabContent>
      );
    }

    return (
      <TabContent className="VideoSelector-newVideo VideoSelector-newVideo--noVideo">
        <Icon name="novideo"/>
        Insert video url here
        <InputField
          type="text"
          value={this.state.video && this.state.video.url ? this.state.video.url : '' }
          onChange={this.handleUrlChange}
        />
      </TabContent>
    );
  }

  renderUploadVideoTab() {
    if (this.state.video && this.state.video.path) {
      return (
        <TabContent className="VideoSelector-newVideo">
          <video className="VideoSelector--player" src={this.state.video.path} type="video/mp4" controls/>
        </TabContent>
      );
    }

    return (
      <TabContent className="VideoSelector-uploadVideo">
        <UploadBox
          onFileAdd={this.uploadFile}
          className="VideoSelector-uploadBox"
          maxSize={102400}
          accept={['.mp4']}
          label="Choose video to upload"
        >
          <Icon name="video" className="Icon--uploadVideo"/>
        </UploadBox>
      </TabContent>
    );
  }

  renderThumbnail(item) {
    const video = getVideo(item.path);

    if (video) {
      return (
        <img
          className="VideoSelector-galleryImage"
          src={video.thumbnail}
        />
      );
    }

    return (
      <img
        className="VideoSelector-galleryImage"
        src={noThumb}
      />
    );
  }

  renderEmpty() {
    return (
      <NoContent
        className="Gallery-noContent"
        title="No videos found."
        text="Upload a video or add a link for an existing one."
        icon="novideo"/>
    );
  }

  renderPreview(item) {
    const videoItem = getVideo(item.path);

    if (item.cdn.source === 'upload') {
      return (
        <video className="VideoSelector--player" src={item.path} type="video/mp4" controls/>
      );
    }

    return (
      <iframe
        src={videoItem.iframe}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    );
  }

  renderRecentVideoTab() {
    return (
      <TabContent>
        <GalleryPhotos
          onSelect={this.handleGalleryVideoSelected}
          renderPreview={this.renderPreview}
          renderEmpty={this.renderEmpty}
          renderThumbnail={this.renderThumbnail}
          hideFilters
          photos={this.props.videoGallery.recentVideos}
        />
      </TabContent>
    );
  }

  renderClearButton() {
    if (this.state.currentTab === 0) {
      return (
        <Button
          onClick={this.handleClearVideo}
          className="VideoSelector-clearVideo"
          disabled={!this.state.video || !this.state.video.url}
        >
          Change video
        </Button>
      );
    }
  }

  renderModalFooter() {
    return (
      <ModalFooter>
        {this.renderClearButton()}
        <Button
          disabled={this.state.isChooseButtonDisabled}
          type="primary"
          onClick={this.handleChoose}
        >
          Choose
        </Button>
        <Button onClick={this.props.onClose}>
          Cancel
        </Button>
      </ModalFooter>
    );
  }

  render() {
    const {
      className,
      onClose,
      open,
      ...props,
      } = this.props;
    const componentClasses = cx('VideoSelector', 'VideoSelector-modal', className);

    return (
      <Modal
        {...props}
        className={componentClasses}
        isOpen={open}
        size="large"
        onClose={onClose}
      >
        <ModalHeader>
          Select video
        </ModalHeader>
        <ModalBody>
          <TabArea
            className="VideoSelector-tabArea"
            currentTab={this.state.currentTab}
            onTabChange={this.handleTabChange}
          >
            <Tab>
              Add a new video
            </Tab>
            <Tab>
              Upload a video
            </Tab>
            <Tab>
              Select a video you used before
            </Tab>
            {this.renderNewVideoTab()}
            {this.renderUploadVideoTab()}
            {this.renderRecentVideoTab()}
          </TabArea>
        </ModalBody>
        {this.renderModalFooter()}
      </Modal>
    );
  }
}
