import React, {Component, PropTypes} from 'react';
import ScrollArea from 'views/components/scroll-area';
import NoContent from 'views/components/no-content';

import './gallery.scss';

export default class GalleryPhotos extends Component {
  static propTypes = {
    photos: PropTypes.array,
    onThumbClick: PropTypes.func,
    renderThumbnail: PropTypes.func,
    renderEmpty: PropTypes.func,
    noPhotosText: PropTypes.string,
  };

  static defaultProps = {
    photos: [],
    noPhotosText: '',
    renderThumbnail(item) {
      return (
        <span
          className="Gallery-thumb"
        >
          <img src={item.path}/>
        </span>
      );
    },
    renderEmpty() {
      return (
        <NoContent
          className="Gallery-noContent"
          title="No photos found."
          text={this.noPhotosText}
          icon="nophoto"/>
      );
    },
  };

  renderThumbs() {
    return this.props.photos.map((item, index) => {
      return (
        <li key={index} onClick={this.props.onThumbClick.bind(this, index)}>
          {this.props.renderThumbnail(item, index)}
        </li>
      );
    });
  }

  render() {
    if (this.props.photos.length === 0) {
      return this.props.renderEmpty();
    }

    return (
      <ScrollArea className="Gallery-scroll">
        <ul className="Gallery-photoGrid">
          {this.renderThumbs()}
        </ul>
      </ScrollArea>
    );
  }
}
