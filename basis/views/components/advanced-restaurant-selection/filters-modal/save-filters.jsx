import React, {Component, PropTypes} from 'react';
import Icon from 'views/components/icon/icon';
import Button from 'views/components/buttons/button';
import InputField from 'views/components/inputfield';
import Modal, { ModalHeader, ModalFooter } from 'views/components/modal';
import FilterDetails from './filter-details';

import './filters-modal.scss';

export default class extends Component {
  static propTypes = {
    lastFilterId: PropTypes.number.isRequired,
    defaultFacilities: PropTypes.array,
    defaultObjectives: PropTypes.array,
    defaultEvents: PropTypes.array,
    selectedFilters: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onChangeFilterDescription: PropTypes.func.isRequired,
    onSaveNewFilters: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      filterDetailsOpen: false,
      selectedFilterIdx: 0,
      selectedFilterItem: null,
      newFilterDescription: null,
    };
    this.handlePresetsToggle = this.onPresetsToggle.bind(this);
    this.handleSaveFilters = this.onSaveFilters.bind(this);
    this.handleChangeDescription = this.onChangeDescription.bind(this);
  }

  onSaveFilters() {
    this.props.onSaveNewFilters();
  }

  onPresetsToggle() {
    this.setState({ filterDetailsOpen: !this.state.filterDetailsOpen });
  }

  onChangeDescription(value) {
    this.props.onChangeFilterDescription(value);
  }

  render() {
    const {filterDetailsOpen} = this.state;
    const {defaultFacilities, defaultObjectives,
      selectedFilters, defaultEvents, lastFilterId} = this.props;

    return (
      <Modal
        isOpen
        noCloseButton
        className="FiltersModal"
        onClose={this.props.onClose}
      >

        <ModalHeader>
          Save Filters - Preset #{lastFilterId + 1}
          <div className="Filters-wrapper-save">
            <InputField
              onChange={this.handleChangeDescription}
              placeholder="Enter a short description about your preset (optional, but recommended)"
            />
          </div>
        </ModalHeader>

        <ModalFooter>
          <div className="Filters-preset-controls">
            <a onClick={this.handlePresetsToggle} className="Filters-load-more" href="#">
              <Icon name="chevron" />
              <span>Show preset details</span>
            </a>

            <div className="Filters-controls-buttons">
              <Button onClick={this.handleSaveFilters} size="small" type="main">
                Save
              </Button>
              <Button onClick={this.props.onClose} size="small">Cancel</Button>
            </div>
          </div>

          <FilterDetails
            canEdit={false}
            open={filterDetailsOpen}
            defaultFacilities={defaultFacilities}
            defaultEvents={defaultEvents}
            defaultObjectives={defaultObjectives}
            selectedFilterItem={selectedFilters}
            lastFilterId={lastFilterId + 1}
          />
        </ModalFooter>
      </Modal>
    );
  }
}
