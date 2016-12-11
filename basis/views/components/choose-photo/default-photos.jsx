import React, {Component} from 'react';
import Gallery from 'views/components/gallery';

export default class DefaultPhotos extends Component {
  static propTypes = {
    onSelect: React.PropTypes.func,
    gallery: React.PropTypes.object,
    actions: React.PropTypes.func,
    section: React.PropTypes.string.isRequired,
    noPhotosText: React.PropTypes.string,
  };

  static defaultProps = {
    noPhotosText: 'Upload a photo or choose one from the recent gallery.',
  };

  constructor() {
    super();
  }

  componentWillMount() {
    if (!this.props.gallery.defaultPhotos.items) {
      this.props.actions.getDefaultGallery(this.props.section);
    }
  }

  componentWillUnmount() {
    this.props.actions.resetGallery();
  }

  render() {
    const {gallery} = this.props;

    if (gallery.status !== 'complete') {
      return <div></div>;
    }

    if (gallery.status === 'complete') {
      return (
        <Gallery
          hideFilters
          photos={gallery.defaultPhotos.items}
          onSelect={this.props.onSelect}
          noPhotosText={this.props.noPhotosText}
        />
      );
    }
  }
}
