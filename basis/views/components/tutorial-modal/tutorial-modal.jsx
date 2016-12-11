import React, {Component, PropTypes, Children} from 'react';
import {Button} from 'views/components/buttons';
import Modal, { ModalFooter } from 'views/components/modal';
import Checkbox from 'views/components/checkbox';

import './tutorial-modal.scss';


export default class extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    showAgainCheckbox: PropTypes.bool,
    tutorialId: PropTypes.string,
    buttonLabel: PropTypes.string,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    onClose: () => {},
  };

  constructor() {
    super();
    this.state = {
      modalOpened: true,
      currentStep: 1,
      showAgain: true,
      showAgainChecked: false,
    };
    this.handleNextStep = this.onNextStep.bind(this);
    this.handleShowAgainChange = this.onShowAgainChange.bind(this);
    this.handleModalClose = this.onModalClose.bind(this);
  }

  componentWillMount() {
    const {tutorialId} = this.props;
    const showAgain = global.localStorage.getItem(tutorialId);
    // explicitly the modal with the `tutorialId` won't be show againg
    if (showAgain === 'false') {
      this.setState({ showAgain: false, modalOpened: false });
    }
    // `null` means this modal should be shown because its `tutorialId` wasn't
    // registered in the localStorage(either true or false)
    if (showAgain === 'null') {
      this.setState({ showAgain: true, modalOpened: true });
    }
  }

  onNextStep() {
    const {currentStep} = this.state;
    const nrOfSteps = Children.count(this.props.children);
    if (currentStep < nrOfSteps) {
      this.setState({ currentStep: currentStep + 1 });
    }
  }

  onShowAgainChange() {
    const {tutorialId} = this.props;
    if (typeof(tutorialId) === 'string' && tutorialId.length) {
      global.localStorage.setItem(this.props.tutorialId, this.state.showAgainChecked);
    }
    this.setState({ showAgainChecked: !this.state.showAgainChecked });
  }

  onModalClose() {
    this.setState({ modalOpened: false });
    this.props.onClose();
  }

  renderFooterButton() {
    const {currentStep} = this.state;
    const nrOfSteps = Children.count(this.props.children);
    if (nrOfSteps > 1 && currentStep < nrOfSteps) {
      return (
        <Button onClick={this.handleNextStep} type="primary" size="small">
          {this.props.buttonLabel || 'Next'}</Button>
      );
    }
    return (
      <Button onClick={this.handleModalClose} type="primary" size="small">
        {this.props.buttonLabel || 'Ok, let\'s go!'}
      </Button>
    );
  }

  renderFooterCheckbox() {
    if (this.props.showAgainCheckbox === true) {
      return (
        <Checkbox
          label="Don't show this again"
          onChange={this.handleShowAgainChange}
          checked={this.state.showAgainChecked}
        />
      );
    }
  }

  renderNextStep() {
    const {children} = this.props;
    const {currentStep} = this.state;
    if (Children.count(children) > 1) {
      return children[currentStep - 1];
    }
    return children;
  }

  render() {
    if (this.state.showAgain === false) {
      return false;
    }

    return (
      <Modal
        className="TutorialModal"
        isOpen={this.state.modalOpened}
        padded
        onClose={this.handleModalClose}
      >
        {this.renderNextStep()}
        <ModalFooter className="clearfix">
          {this.renderFooterCheckbox()}
          {this.renderFooterButton()}
        </ModalFooter>
      </Modal>
    );
  }
}
