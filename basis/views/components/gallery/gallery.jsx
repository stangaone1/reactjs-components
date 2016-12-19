import React, {Component, PropTypes} from 'react';
import GalleryFilters from './gallery-filters';
import GalleryPhotos from './gallery-photos';
import Icon from 'views/components/icon';
import NextPrev from 'views/components/nextprev';
import cx from 'classnames';
import {isNull} from 'lodash';

import './gallery.scss';

class Gallery extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    filters: PropTypes.array,
    hideFilters: PropTypes.bool,
    className: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    renderPreview: PropTypes.func,
    noPhotosText: PropTypes.string,
  };

  static defaultProps = {
    photos: [],
    filters: [],
    hideFilters: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPhoto: null,
      photos: props.photos,
    };

    this.closePhotoPreview = this.closePhotoPreview.bind(this);
    this.changePhotoPreview = this.changePhotoPreview.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onThumbClick(index) {
    this.setState({
      currentPhoto: index,
    }, () => {
      this.props.onSelect(this.props.photos[this.state.currentPhoto]);
    });
  }

  closePhotoPreview() {
    this.setState({
      currentPhoto: null,
    }, () => {
      this.props.onSelect(null);
    });
  }

  changePhotoPreview(inc) {
    this.setState({
      currentPhoto: this.state.currentPhoto + inc,
    }, () => {
      this.props.onSelect(this.props.photos[this.state.currentPhoto]);
    });
  }

  onFilterChange(selection) {
    // gets active filter and filters photo list

    const activeFilters = this.props.filters.map((item, index) => {
      const current = {};

      current[item.name] = item.values[selection[index]];
      return current;
    });

    // return photos
    // const activePhotos = filter(photos, {category: 'Jobs'});
  }

  renderPhotoPreview() {
    const photosCount = this.state.photos.length;

    if (isNull(this.state.currentPhoto)) {
      return false;
    }

    return (
      <div
        className="Gallery-photoPreview"
        style={{backgroundImage: 'url(' + this.state.photos[this.state.currentPhoto].path + ')'}}>
        <div className="Gallery-topWrap">
          <div className="Gallery-photoControls">
            <span className="Gallery-back" onClick={this.closePhotoPreview}>
              <Icon name="gallery"/>
              View gallery
            </span>
            <NextPrev
              className="NextPrev--gallery"
              prevDisabled={this.state.currentPhoto === 0}
              nextDisabled={this.state.currentPhoto === photosCount - 1 }
              onClickNext={this.changePhotoPreview.bind(this, 1)}
              onClickPrev={this.changePhotoPreview.bind(this, -1)}
            />
          </div>
        </div>
        {this.props.renderPreview && this.props.renderPreview(this.state.photos[this.state.currentPhoto])}
      </div>
    );
  }

  renderFilters() {
    if (this.props.hideFilters) {
      return null;
    }

    return (<GalleryFilters
        filters={this.props.filters}
        filterValues={['0', '0', '0']}
        resultsCount={this.state.photos.length}
        onChange={this.onFilterChange}/>
    );
  }

  renderPhotos() {
    if (!isNull(this.state.currentPhoto)) {
      return null;
    }

    return (
      <div>
        <div className="Gallery-photosWrap">
          <GalleryPhotos
            {...this.props}
            photos={this.state.photos}
            onThumbClick={this.onThumbClick.bind(this)}
          />
        </div>
        {this.renderFilters()}
      </div>
    );
  }

  render() {
    const cssClass = cx({
      'Gallery': true,
      'clearfix': true,
      'Gallery--noFilters': this.props.hideFilters,
    });
    return (
      <div className={cssClass}>
        {this.renderPhotoPreview()}
        {this.renderPhotos()}
      </div>
    );
  }
}

export default Gallery;
