import React, {Component, PropTypes} from 'react';

import {Button} from 'views/components/buttons';
import Modal, { ModalHeader, ModalBody, ModalFooter} from 'views/components/modal';
import { TabArea, Tab, TabContent } from 'views/components/tab-area';
import {isNull} from 'lodash';

import {map} from 'lodash';
import cx from 'classnames';

import './choose-photo.scss';

class ChoosePhoto extends Component {
  static propTypes = {
    buttonText: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    tabs: PropTypes.object.isRequired,
    isModalOpen: PropTypes.bool,
    onModalClose: PropTypes.func.isRequired,
    onButtonClick: PropTypes.func.isRequired,
    withModalFooter: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    hideButton: PropTypes.bool,
    section: PropTypes.string,
    buttonProps: PropTypes.object,
    block: PropTypes.bool,
  };

  static defaultProps = {
    buttonText: 'Choose Picture',
    title: 'ChoosePhoto',
    withModalFooter: true,
    hideButton: false,
    block: false,
  };

  constructor() {
    super();

    this.state = {
      currentTab: 0,
      showChooseButton: false,
      file: null,
    };

    this.onTabChange = this.onTabChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.resetState = this.resetState.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
  }

  resetState(callback) {
    this.setState({
      currentTab: 0,
      showChooseButton: false,
      file: null,
    }, callback);
  }

  onTabChange(tabIndex) {
    this.setState({
      currentTab: tabIndex,
    });
  }

  closeModal() {
    this.resetState(this.props.onModalClose());
  }

  onSelect(file) {
    this.setState({
      showChooseButton: !isNull(file),
      file: file,
    });
  }

  uploadPhoto(section, file) {
    if(this.props.uploadPhoto) {
      this.props.uploadPhoto(section, file)
    }
  }

  renderModal() {
    if (this.props.isModalOpen) {
      return (
        <Modal
          className="ChoosePhoto-modal"
          isOpen={this.props.isModalOpen}
          size="large"
          onClose={this.closeModal}
        >
          <ModalHeader>
            <span>{this.props.title}</span>
          </ModalHeader>

          <ModalBody>
            <TabArea
              className="ChoosePhoto-tabArea"
              currentTab={this.state.currentTab}
              onTabChange={this.onTabChange}
            >
              {this.renderTabs()}
              {this.renderTabsContent()}
            </TabArea>
          </ModalBody>
          {this.renderModalFooter()}
        </Modal>
      );
    }
  }

  renderModalFooter() {
    if (!this.props.withModalFooter) {
      return null;
    }

    return (
      <ModalFooter>
        <Button
          disabled={!this.state.showChooseButton}
          type="main"
          onClick={this.props.onSelect.bind(this, this.state.file)}
        >
          Choose
        </Button>
        <Button onClick={this.closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    );
  }

  renderTabs() {
    const {tabs} = this.props;

    return map(tabs, (item) => {
      const label = item.label;

      return (
        <Tab key={'tab_' + label}>
          {label}
        </Tab>
      );
    });
  }

  renderTabsContent() {
    const {tabs} = this.props;

    return map(tabs, (item) => {
      const tabKey = item.label.replace(/ /g, '_');

      return (
        <TabContent key={tabKey}>
          {React.createElement(item.component, {
            ...item.props,
            section: this.props.section,
            onSelect: this.onSelect,
            uploadPhoto: this.uploadPhoto,
          }, item.props && item.props.children)}
        </TabContent>
      );
    });
  }

  renderButton() {
    if (!this.props.hideButton) {
      return (
        <Button
          {...this.props.buttonProps}
          disabled={this.props.isModalOpen}
          onClick={this.props.onButtonClick}
          block={this.props.block}
        >
          {this.props.buttonText}
        </Button>
      );
    }
  }

  render() {
    return (
      <div className={cx('ChoosePhoto-wrap', this.props.className)}>
        {this.renderButton()}
        {this.renderModal()}
      </div>
    );
  }
}

export default ChoosePhoto;