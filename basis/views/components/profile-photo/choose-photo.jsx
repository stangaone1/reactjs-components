import React, {Component, PropTypes} from 'react';
import ChoosePhoto from 'views/components/choose-photo';
import RecentPhotos from 'views/components/choose-photo/recent-photo';
import DefaultPhotos from 'views/components/choose-photo/default-photos';
import NewPhoto from 'views/components/choose-photo/new-photo';

const choosePhotoTabs = {
  newPhoto: {
    visible: true,
    label: 'Add a new photo',
    component: NewPhoto,
  },
  default: {
    visible: true,
    label: 'Default gallery',
    componentChoosePhoto: DefaultPhotos,
  },
  recent: {
    visible: true,
    label: 'Select a photo you have used before',
    component: RecentPhotos,
  },
};

export default class ChooseUserPhoto extends Component {
  static propTypes = {
    onPhotoUpload: PropTypes.func,
    section: PropTypes.string.isRequired,
  }

  constructor() {
    super();

    this.state = {
      isModalOpen: false,
    };

    this.onPhotoSelect = this.onPhotoSelect.bind(this);
  }

  onModalClose() {
    this.setState({
      isModalOpen: false,
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  onPhotoSelect(file) {
    const {onPhotoUpload} = this.props;
    if (onPhotoUpload) {
      onPhotoUpload(file);
    }
    this.onModalClose();
  }

  render() {
    const {section} = this.props;
    return (
      <ChoosePhoto
        className={'ChoosePhoto--custom'}
        isModalOpen={this.state.isModalOpen}
        onButtonClick={this.toggleModal.bind(this)}
        onModalClose={this.onModalClose.bind(this)}
        tabs={choosePhotoTabs}
        title="Choose photo custom title"
        onSelect={this.onPhotoSelect}
        block
        section={section}
      />
    );
  }
}
