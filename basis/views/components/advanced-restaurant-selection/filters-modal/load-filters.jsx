import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import {difference, cloneDeep} from 'lodash';
import moment from 'moment';

import Icon from 'views/components/icon/icon';
import Button from 'views/components/buttons/button';
import restaurantFiltersCounter from 'lib/utils/restaurant-filters-counter';
import Modal, {ModalHeader, ModalBody, ModalFooter} from 'views/components/modal';
import FilterDetails from './filter-details';

import './filters-modal.scss';

const validateFilter = (filter = {}) => {
  const requiredKeys = ['createdAt', 'createdBy', 'description', 'facilities',
    'location', 'objectives'];
  return difference(requiredKeys, Object.keys(filter)).length === 0;
};

export default class extends Component {
  static propTypes = {
    predefinedFilters: PropTypes.array.isRequired,
    defaultFacilities: PropTypes.array.isRequired,
    defaultObjectives: PropTypes.array.isRequired,
    defaultEvents: PropTypes.array.isRequired,
    onLoadFilters: PropTypes.func.isRequired,
    onDescriptionChanged: PropTypes.func.isRequired,
    onDeletePreset: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
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
    this.handleLoadFilters = this.onLoadFilters.bind(this);
    this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
    this.onDeletePreset = this.onDeletePreset.bind(this);
  }

  componentWillMount() {
    const {predefinedFilters} = this.props;
    if (predefinedFilters && predefinedFilters.length) {
      this.setState({selectedFilterItem: predefinedFilters[0]});
    }
  }

  componentWillReceiveProps(nextProps) {
    const {predefinedFilters} = nextProps;
    if (predefinedFilters && predefinedFilters.length) {
      this.setState({
        selectedFilterIdx: 0,
        selectedFilterItem: predefinedFilters[0],
      });
    }
  }

  onLoadFilters() {
    this.props.onLoadFilters(this.state.selectedFilterItem);
  }

  onPresetsToggle() {
    this.setState({filterDetailsOpen: !this.state.filterDetailsOpen});
  }

  onDeletePreset(selectedFilterItemId) {
    // this.setState({
    //   selectedFilterIdx: 0,
    //   selectedFilterItem: this.props.predefinedFilters[0],
    // }, ()=>{
    this.props.onDeletePreset(selectedFilterItemId);
    // });
  }

  onDescriptionChanged(selectedFilterItemId, selectedFilterItemDescription) {
    const selectedFilterItem = cloneDeep(this.state.selectedFilterItem);
    selectedFilterItem.description = selectedFilterItemDescription;
    this.setState({
      selectedFilterItem: selectedFilterItem,
    }, () => {
      this.props.onDescriptionChanged(selectedFilterItemId, selectedFilterItemDescription);
    });
  }

  onSelectPredefinedFilter(idx) {
    this.setState({
      selectedFilterIdx: idx,
      selectedFilterItem: this.props.predefinedFilters[idx],
    });
  }

  renderFilterListItem(filter, idx) {
    const elementClasses = cx('FiltersList-item', {
      'FiltersList-item--selected': idx === this.state.selectedFilterIdx,
    });

    // if a filter doesn't contain all the proper key-values, do not render it
    if (validateFilter(filter) === false) {
      return false;
    }

    return (
      <li
        key={idx}
        onClick={this.onSelectPredefinedFilter.bind(this, idx)}
        className={elementClasses}
      >
        <div className="FiltersList-item-description">
          <h6>Preset #{filter.id}</h6>
          <p>{filter.description}</p>
        </div>
        <div className="FiltersList-item-meta">
           <span className="Item-saved-by">
            {restaurantFiltersCounter(filter)} &nbsp; filters saved by &nbsp;{filter.createdBy}
           </span>
          <span className="Item-saved-at">{moment(filter.createdAt).format('MM-DD-YYYY')}</span>
        </div>
      </li>
    );
  }

  render() {
    const {selectedFilterItem, filterDetailsOpen} = this.state;
    const {defaultFacilities, defaultObjectives, defaultEvents} = this.props;
    const filterDetailsClasses = cx('Filters-preset-controls', {
      'Filters-preset-controls--open': filterDetailsOpen,
    });

    return (
      <Modal
        isOpen
        noCloseButton
        className="FiltersModal"
        onClose={this.props.onClose}
      >

        <ModalHeader>Load Filters</ModalHeader>

        <ModalBody>
          <ul className="FiltersList-container">
            {this.props.predefinedFilters.map((item, idx) => {
              return this.renderFilterListItem(item, idx);
            })}
          </ul>
        </ModalBody>

        <ModalFooter>
          <div className={filterDetailsClasses}>
            <a onClick={this.handlePresetsToggle} className="Filters-load-more" href="#">
              <Icon name="chevron"/>
              <span>Show preset details</span>
            </a>

            <div className="Filters-controls-buttons">
              <Button onClick={this.handleLoadFilters} size="small" type="main">
                Load
              </Button>
              <Button onClick={this.props.onClose} size="small">Cancel</Button>
            </div>
          </div>

          <FilterDetails
            canEdit
            open={filterDetailsOpen}
            defaultFacilities={defaultFacilities}
            defaultEvents={defaultEvents}
            defaultObjectives={defaultObjectives}
            selectedFilterItem={selectedFilterItem}
            onDescriptionChanged={this.onDescriptionChanged}
            onDeletePreset={this.onDeletePreset}
          />
        </ModalFooter>
      </Modal>
    );
  }
}
