import React, { Component, PropTypes } from 'react';
import { reset, destroy } from 'redux-form';
import { connect } from 'react-redux';
import Modal, { ModalHeader, ModalBody, ModalFooter } from 'views/components/modal';
import Button from 'views/components/buttons/button';
import Notification from 'views/components/notification';
import EditSectionForm from './edit-section-form';
import restrictedCompare from 'lib/utils/restricted-compare';

import './edit-section.scss';

class EditSection extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    section: PropTypes.object.isRequired,
    onNext: PropTypes.func,
    onSubmit: PropTypes.func,
    reset: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    isBulk: PropTypes.bool,
  };

  static defaultProps = {
    section: {},
    isBulk: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      warningNotificationHidden: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.destroyForm = this.destroyForm.bind(this);
    this.handleCloseWarningNotification = this.handleCloseWarningNotification.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return restrictedCompare(this, nextProps, nextState);
  }

  handleClose() {
    this.destroyForm();
    this.props.onClose();
  }

  handleSubmit() {
    this.refs.editSectionForm.submit();
    this.destroyForm();
  }

  resetForm() {
    this.props.reset('editRestaurantSection');
  }

  destroyForm() {
    this.props.destroy('editRestaurantSection');
  }

  handleBack() {
    this.destroyForm();
    this.props.onBack();
  }

  handleCloseWarningNotification() {
    this.setState({
      warningNotificationHidden: true,
    });
  }

  renderForm() {
    const { section, onSubmit } = this.props;
    if (section.fields) {
      return (
        <EditSectionForm
          ref="editSectionForm"
          onSubmit={onSubmit}
          fields={Object.keys(section.fields)}
          initialValues={section.fields}
        />
      );
    }
  }

  renderActionButton() {
    const { onNext, isBulk } = this.props;
    if (isBulk) {
      return <Button className="pull-right" onClick={onNext}>Next</Button>;
    }

    return <Button type="main" className="pull-right" onClick={this.handleSubmit}>Apply</Button>;
  }

  render() {
    const { isOpen, section } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onClose={this.handleClose}
        padded
      >
        <ModalHeader>Edit Section</ModalHeader>
        <ModalBody>
          <Notification
            type="warning"
            onCloseClick={this.handleCloseWarningNotification}
            hidden={this.state.warningNotificationHidden}
            block
          >
            Warning: Modifying this section will overwrite ...
          </Notification>
          <div className="clearfix">
            <div className="pull-right">
              <Button size="small">Import From</Button>
              <Button size="small" onClick={this.resetForm}>Reset</Button>
            </div>
            <div className="EditSection-sectionName">
              {section.name}
              <span className="EditSection-parentSectionName">
                ( {section.parentSectionName} )
              </span>
            </div>
          </div>
          {this.renderForm()}
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.handleBack}>Back</Button>
          {this.renderActionButton()}
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(undefined, {reset, destroy})(EditSection);
