import React, { Component, cloneElement } from 'react';
import ChoosePhoto from 'views/components/choose-photo';
import RecentPhotos from 'views/components/choose-photo/recent-photo';
import DefaultPhotos from 'views/components/choose-photo/default-photos';
import NewPhoto from 'views/components/choose-photo/new-photo';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext} from 'react-dnd';

const uploadPhoto = ()=> {
  console.log('SOME ACTION TO UPLOAD A PHOTO TO SERVER')
}

const TABS = {
  newPhoto: {
    visible: true,
    label: 'Add a new photo',
    component: NewPhoto
  },
  defaultPhotos: {
    visible: true,
    label: 'Select a photo from default gallery',
    component: DefaultPhotos,
  },
  recentPhotos: {
    visible: true,
    label: 'Select a photo you have used before',
    component: RecentPhotos,
  },
};

@dragDropContext(HTML5Backend)
export default class ChoosePhotoContainer extends Component {
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
    console.log('Final file', file);
    this.onModalClose();
  }

  uploadPhoto(section, file) {
    console.log('dispatch some redux action to upload the file', file);
  }

  render() {
    return (
        <div>
          <ChoosePhoto
            className={'ChoosePhoto--custom'}
            isModalOpen={this.state.isModalOpen}
            onButtonClick={this.toggleModal.bind(this)}
            onModalClose={this.onModalClose.bind(this)}
            uploadPhoto={this.uploadPhoto}
            tabs={TABS}
            title="Choose photo custom title"
            onSelect={this.onPhotoSelect}
            section="lookandfeel"
          />

        </div>
    );
  }
}

ChoosePhotoContainer.displayName = 'ChoosePhotoContainer';
