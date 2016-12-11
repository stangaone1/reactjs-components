import React, {Component, PropTypes} from 'react';
import {debounce, findIndex} from 'lodash';
import restaurantFiltersCounter from 'lib/utils/restaurant-filters-counter';
import {Button} from 'views/components/buttons';
import InputField from 'views/components/inputfield';
import Select from 'views/components/select';
import Icon from 'views/components/icon';
import Panel, {PanelContent, PanelHeader} from 'views/components/panel';
import CheckboxList from 'views/components/checkbox-list';
import {Accordion, AccordionSection,
    AccordionSectionHeader, AccordionSectionBody} from 'views/components/accordion';

const remapFilters = (filters) => {
  return filters.map(item => {
    return {
      title: item.label,
      value: item.id,
      label: item.label,
    };
  });
};

export default class FiltersPanel extends Component {
  static propTypes = {
    openedSections: PropTypes.array.isRequired,
    states: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    coops: PropTypes.array,
    facilities: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
    objectives: PropTypes.array.isRequired,
    selectedFilters: PropTypes.object.isRequired,

    multipleOwnerRegions: PropTypes.array,
    isMultipleOwner: PropTypes.bool,
    isCoop: PropTypes.bool,
    selectedIdOwner: PropTypes.number,
    selectedCoopId: PropTypes.number,

    onOpenLoadFilters: PropTypes.func.isRequired,
    onOpenSaveFilters: PropTypes.func.isRequired,
    onClearSelectedFilters: PropTypes.func.isRequired,
    onQuickSearchChange: PropTypes.func.isRequired,
    onLocationStateChange: PropTypes.func.isRequired,
    onLocationCityChange: PropTypes.func.isRequired,
    onObjectivesChange: PropTypes.func.isRequired,
    onFacilitiesChange: PropTypes.func.isRequired,
    onEventsChange: PropTypes.func.isRequired,
    onOwnerChanged: PropTypes.func,
    onCoopChanged: PropTypes.func,

    title: PropTypes.string,
  };

  static defaultProps = {
    onLocationChange: () => {
    },
    states: [],
    cities: [],
    objectives: [],
    isMultipleOwner: false,
    isCoop: false,
    multipleOwnerRegions: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      openedSections: null,
    };
    this.handleQuickSearch = debounce(props.onQuickSearchChange, 200);
    this.onOwnerChanged = this.onOwnerChanged.bind(this);
    this.onCoopChanged = this.onCoopChanged.bind(this);
  }

  toggleFilterSections(toggledSection) {
    const openedSections = this.state.openedSections || this.props.openedSections;
    const indexes = openedSections.slice();
    const index = indexes.indexOf(toggledSection);
    if (index === -1) {
      indexes.push(toggledSection);
    } else {
      indexes.splice(index, 1);
    }
    this.setState({openedSections: indexes});
  }

  onOwnerChanged(value, label) {
    if (this.props.onOwnerChanged) {
      this.props.onOwnerChanged(value, label);
    }
  }

  onCoopChanged(value, label) {
    if (this.props.onCoopChanged) {
      this.props.onCoopChanged(value, label);
    }
  }

  renderLocationStates() {
    const {location} = this.props.selectedFilters;
    const {states, onLocationStateChange} = this.props;
    return (
        <Select
            value={location.state}
            placeholder="All States"
            onChange={onLocationStateChange}
        >
          {states.map((state, idx) => {
            return (
                <option key={idx} value={state.code}>
                  {state.name}
                </option>
            );
          })}
        </Select>
    );
  }

  renderLocationCities() {
    const {location} = this.props.selectedFilters;
    const {onLocationCityChange, cities} = this.props;
    return (
        <Select
            value={location.city}
            placeholder="All Cities"
            disabled={cities.length < 1}
            onChange={onLocationCityChange}
        >
          {cities.map((city, idx) => {
            return <option key={idx} value={city !== 'All' ? city : ''}>{city}</option>;
          })}
        </Select>
    );
  }

  renderMultipleOwners() {
    const {isMultipleOwner, multipleOwnerRegions} = this.props;
    if (isMultipleOwner) {
      return (
          <Select
              value={this.props.selectedIdOwner}
              placeholder="Select Region"
              disabled={multipleOwnerRegions.length < 1}
              onChange={this.onOwnerChanged}
          >
            {multipleOwnerRegions.map((owner, idx) => {
              return <option key={idx} value={owner.id}>{owner.name}</option>;
            })}
          </Select>
      );
    }
  }

  renderCoops() {
    const allIndex = findIndex(this.props.coops, coop => coop.name == 'All Coops')
    if (allIndex === -1) {
      this.props.coops.unshift({coopID: '', name: 'All Coops'});
    }
    return (
        <Select
            value={this.props.selectedCoopId}
            placeholder="Select Coop"
            onChange={this.onCoopChanged}
        >
          {this.props.coops.map((coop, idx) => {
            return <option key={idx} value={coop.coopID}>{coop.name}</option>;
          })}
        </Select>
    );
  }

  renderCoopsSection() {
    if (this.props.isCoop) {
      return (
          <AccordionSection>
            <AccordionSectionHeader>Restaurant in coop:</AccordionSectionHeader>
            <AccordionSectionBody>
              {this.renderCoops()}
            </AccordionSectionBody>
          </AccordionSection>
      );
    }
  }

  renderOwnersSection() {
    if (this.props.isMultipleOwner) {
      return (
          <AccordionSection>
            <AccordionSectionHeader>Restaurant for owner:</AccordionSectionHeader>
            <AccordionSectionBody>
              {this.renderMultipleOwners()}
            </AccordionSectionBody>
          </AccordionSection>
      );
    }
    return <div/>;
  }

  render() {
    const searchInputIcon = <Icon name="search"/>;
    const nearbyObjectives = remapFilters(this.props.objectives);
    const facilities = remapFilters(this.props.facilities);
    const events = remapFilters(this.props.events);
    const filtersCount = restaurantFiltersCounter(this.props.selectedFilters);
    const openedSections = this.state.openedSections || this.props.openedSections;

    const {title} = this.props;

    return (
        <Panel className="FiltersPanel">
          <PanelHeader
              title={title || "Filters"}
          >
            <span className="AdvancedSelectionHeader-info">({filtersCount})</span>
            <div className="AdvancedSelectionHeader-controls">
              <Button
                  onClick={this.props.onOpenLoadFilters}
                  size="small"
              >
                Load
              </Button>

              <Button
                  disabled={filtersCount < 1}
                  onClick={this.props.onOpenSaveFilters}
                  size="small"
              >
                Save
              </Button>

              <Button
                  disabled={filtersCount < 1}
                  size="small"
                  onClick={this.props.onClearSelectedFilters}
              >
                Clear All
              </Button>
            </div>
          </PanelHeader>

          <PanelContent className="AccordionPanel">
            <Accordion
                onSectionClick={this.toggleFilterSections.bind(this)}
                openedSections={openedSections}
            >
              <AccordionSection>
                <AccordionSectionHeader>Quick Search:</AccordionSectionHeader>
                <AccordionSectionBody>
                  <InputField
                      value={this.props.selectedFilters.quickSearch}
                      placeholder="Restaurant name may contain.."
                      onChange={this.handleQuickSearch}
                      iconLeft={searchInputIcon}/>
                </AccordionSectionBody>
              </AccordionSection>

              {this.renderOwnersSection()}
              {this.renderCoopsSection()}

              <AccordionSection>
                <AccordionSectionHeader>Restaurant located in:</AccordionSectionHeader>
                <AccordionSectionBody>
                  {this.renderLocationStates()}
                  {this.renderLocationCities()}
                </AccordionSectionBody>
              </AccordionSection>

              <AccordionSection>
                <AccordionSectionHeader>Has the following objectives nearby:</AccordionSectionHeader>
                <AccordionSectionBody>
                  <CheckboxList
                      options={nearbyObjectives}
                      value={this.props.selectedFilters.objectives}
                      onChange={this.props.onObjectivesChange}
                  />
                </AccordionSectionBody>
              </AccordionSection>

              <AccordionSection>
                <AccordionSectionHeader>Offers the following facilities:</AccordionSectionHeader>
                <AccordionSectionBody>
                  <CheckboxList
                      options={facilities}
                      value={this.props.selectedFilters.facilities}
                      onChange={this.props.onFacilitiesChange}
                  />
                </AccordionSectionBody>
              </AccordionSection>

              <AccordionSection>
                <AccordionSectionHeader>Hosts the following events:</AccordionSectionHeader>
                <AccordionSectionBody>
                  <CheckboxList
                      options={events}
                      value={this.props.selectedFilters.events}
                      onChange={this.props.onEventsChange}
                  />
                </AccordionSectionBody>
              </AccordionSection>
            </Accordion>
          </PanelContent>
        </Panel>
    );
  }
}
