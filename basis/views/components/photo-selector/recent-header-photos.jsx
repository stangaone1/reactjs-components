import React, {Component} from 'react';
import Gallery from 'views/components/gallery';

export default class RecentHeaderPhotos extends Component {
  static propTypes = {
    onSelect: React.PropTypes.func,
    gallery: React.PropTypes.object,
    getRecentGallery: React.PropTypes.func,
    section: React.PropTypes.string,
  };

  static defaultProps = {
    section: 'lookandfeel',
  };

  componentWillMount() {
    if (!this.props.gallery.recentPhotos.items) {
      this.props.getRecentGallery(this.props.section);
    }
  }

  render() {
    const {gallery} = this.props;

    if (gallery.status !== 'complete') {
      return (<div></div>);
    }

    if (gallery.status === 'complete') {
      return (
        <Gallery
          hideFilters
          photos={gallery.recentPhotos.items}
          onSelect={this.props.onSelect}
          noPhotosText="Upload a photo or choose one from the default gallery."
        />
      );
    }
  }
}
