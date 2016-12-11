import React, { Component, PropTypes } from 'react';
import { destroy } from 'redux-form';
import { connect } from 'react-redux';
import Button from 'views/components/buttons/button';
import Modal, { ModalHeader, ModalBody, ModalFooter } from 'views/components/modal';
import Notification from 'views/components/notification';
import CheckboxSection from 'views/components/checkbox-section';
import restrictedCompare from 'lib/utils/restricted-compare';

import './confirm-selected-restaurants.scss';

class ConfirmSelectedRestaurants extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    restaurants: PropTypes.array.isRequired,
    onApply: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
  };

  static defaultProps = {
    restaurants: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurantsId: [],
      warningNotificationHidden: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.destroyForm = this.destroyForm.bind(this);
    this.handleCloseWarningNotification = this.handleCloseWarningNotification.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedRestaurantsId: nextProps.restaurants.map(restaurant => restaurant.id),
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return restrictedCompare(this, nextProps, nextState);
  }

  destroyForm() {
    this.props.destroy('editRestaurantSection');
  }

  handleClose() {
    this.destroyForm();
    this.props.onClose();
  }

  handleApply() {
    this.props.onApply(this.state.selectedRestaurantsId);
    this.destroyForm();
  }

  handleCheckboxChange(id) {
    const index = this.state.selectedRestaurantsId.indexOf(id);
    if (index > -1) {
      this.setState({
        selectedRestaurantsId: [
          ...this.state.selectedRestaurantsId.slice(0, index),
          ...this.state.selectedRestaurantsId.slice(index + 1),
        ],
      });
    } else {
      this.setState({
        selectedRestaurantsId: [...this.state.selectedRestaurantsId, id],
      });
    }
  }

  handleCloseWarningNotification() {
    this.setState({
      warningNotificationHidden: true,
    });
  }

  renderRestaurants() {
    const { restaurants } = this.props;
    return restaurants.map(restaurant => {
      return (
        <div className="ConfirmSelectedRestaurants-restaurant" key={restaurant.id}>
          <CheckboxSection
              checked={this.state.selectedRestaurantsId.indexOf(restaurant.id) > -1}
              label={restaurant.name}
              onChange={this.handleCheckboxChange.bind(this, restaurant.id)}
              text={`${restaurant.city}, ${restaurant.state}`}
            />
        </div>
      );
    });
  }

  render() {
    const { isOpen, onBack } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onClose={this.handleClose}
      >
        <ModalHeader>Confirm Selected Restaurants</ModalHeader>
        <ModalBody>
          <div className="ConfirmSelectedRestaurants-container">
            <Notification
              type="warning"
              onCloseClick={this.handleCloseWarningNotification}
              hidden={this.state.warningNotificationHidden}
              block
            >
              Warning: You are about to overwrite ... This action cannot be undone.
            </Notification>
            <div className="clearfix">
              {this.renderRestaurants()}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onBack}>Back</Button>
          <Button type="main" className="pull-right" onClick={this.handleApply}>Apply</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(undefined, {destroy})(ConfirmSelectedRestaurants);
