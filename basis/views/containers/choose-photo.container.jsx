import React, { Component } from 'react';
import ChoosePhoto from 'views/components/choose-photo';
import RecentPhotos from 'views/components/choose-photo/recent-photo';
import DefaultPhotos from 'views/components/choose-photo/default-photos';
import NewPhoto from 'views/components/choose-photo/new-photo';

const TABS = {
  newPhoto: {
    visible: true,
    label: 'Add a new photo',
    component: NewPhoto,
    props: {
      label: 'custom label',
    },
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

  render() {
    return (
        <div>
          <h1>Component specs</h1>
          <ul>
            <li>configurable tabs</li>
            <li>configurable title & button text</li>
            <li>supports modal opened by default</li>
            <li>uses the <a href="/components/NoContentContainer"><span style={{color: 'red'}}>NEW!</span> NoContent Component</a></li>
          </ul>
          <ChoosePhoto
            className={'ChoosePhoto--custom'}
            isModalOpen={this.state.isModalOpen}
            onButtonClick={this.toggleModal.bind(this)}
            onModalClose={this.onModalClose.bind(this)}
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
