import React, {Component, PropTypes} from 'react';
import {findIndex, intersection, uniq} from 'lodash';
import FiltersPanel from './filters-panel.jsx';
import FiltersPanelCoop from './filters-panel-coop.jsx';
import WebsitesPanel from './websites-panel.jsx';
import TargetedWebsitesPanel from './targeted-websites-panel.jsx';

import './advanced-restaurant-selection.scss';

function addRemove(from, replace) {
  const targetIndex = findIndex(from, (item) => item.name === replace.name);
  let newList = [];

  if (targetIndex >= 0) {
    const clonedList = from.slice();
    clonedList.splice(targetIndex, 1);
    newList = clonedList;
  } else {
    newList = from.concat(replace);
  }

  return newList;
}

// it filters the sites/items that are already inside the targetedWebsites
function filterTargetedWebsites(websites, targetedWebsites) {
  return websites.filter(targeted => targetedWebsites
    .filter(item => item.name === targeted.name).length === 0);
}

export default class AdvancedRestaurantSelection extends Component {
  static propTypes = {
    restaurants: PropTypes.array.isRequired,
    coops: PropTypes.array.isRequired,
    selectedFilters: PropTypes.object.isRequired,
    states: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    objectives: PropTypes.array,
    facilities: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
    openedSections: PropTypes.array,
    multipleOwnerRegions: PropTypes.array,
    isMultipleOwner: PropTypes.bool,
    isCoop: PropTypes.bool,
    onOpenLoadFilters: PropTypes.func.isRequired,
    onOpenSaveFilters: PropTypes.func.isRequired,
    onClearSelectedFilters: PropTypes.func.isRequired,
    onSaveNewFilters: PropTypes.func.isRequired,
    selectedIdOwner: PropTypes.number,
    selectedCoopId: PropTypes.number,
    filtersTitle: PropTypes.string,
    websitesTitle: PropTypes.string,
    targetedWebsitesTitle: PropTypes.string,

    onLocationStateChange: PropTypes.func.isRequired,
    onLocationCityChange: PropTypes.func.isRequired,
    onObjectivesChange: PropTypes.func.isRequired,
    onFacilitiesChange: PropTypes.func.isRequired,
    onEventsChange: PropTypes.func.isRequired,
    onQuickSearchChange: PropTypes.func.isRequired,
    onOwnerChanged: PropTypes.func.isRequired,
    onCoopChanged: PropTypes.func.isRequired,
    onTargetedWebsitesChange: PropTypes.func.isRequired,
    selectedRestaurants: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    restaurants: [],
    publishCoop: false,
    isMultipleOwner: false,
    openedSections: [0, 1],
  };

  constructor(props) {
    super(props);

    const defaultWebsites = props.selectedRestaurants && props.selectedRestaurants.length
      ? props.selectedRestaurants
      : [];

    this.state = {
      // checkbox inside "you websites" panel
      selectedWebsitesChecked: false,
      // checkbox inside "targeted websites" panel
      targetedWebsitesChecked: false,
      // websites that are "checked"/"selected" inside the "your websites" panel
      selectedWebsitesList: defaultWebsites,
      // webstites that are present in the "targeted websites" panel
      targetedWebsitesList: defaultWebsites,
      // websites inside the "targeted websites" that are checked
      removableWebsitesList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedRestaurants !== nextProps.selectedRestaurants) {
      this.setState({targetedWebsitesList: uniq(nextProps.selectedRestaurants)});
    }
  }

  // toggle all websites inside the 'YOUR WEBSITES' panel
  onSelectedWebsitesToggle(checked) {
    const {selectedWebsitesChecked, targetedWebsitesList} = this.state;
    const {restaurants} = this.props;

    const selectedWebsitesList = checked
      ? filterTargetedWebsites(restaurants, targetedWebsitesList)
      : [];
    this.setState({
      selectedWebsitesChecked: !selectedWebsitesChecked,
      selectedWebsitesList,
    });
  }

  // toggle all websites inside the 'TARGETED WEBSITES' panel
  onTargetedWebsitesToggleAll(checked) {
    const {targetedWebsitesList, targetedWebsitesChecked} = this.state;

    const newTargetedWebsitesChecked =
      Boolean(!targetedWebsitesChecked && targetedWebsitesList.length);
    this.setState({
      targetedWebsitesChecked: newTargetedWebsitesChecked,
      removableWebsitesList: checked ? targetedWebsitesList : [],
    });
  }

  // toggle a specific website inside the 'YOUR WEBSITES' panel
  onWebsiteToggle(target) {
    const selectedWebsitesList =
      addRemove(this.state.selectedWebsitesList, target);
    this.setState({
      selectedWebsitesList,
      selectedWebsitesChecked: selectedWebsitesList.length > 0,
    });
  }

  // toggle a specifict website inside the 'TARGETED WEBSITES' panel
  onRemovableToggle(target) {
    const removableWebsitesList =
      addRemove(this.state.removableWebsitesList, target);
    this.setState({
      removableWebsitesList,
      targetedWebsitesChecked: removableWebsitesList.length > 0,
    });
  }

  // drag n drop a website to the 'TARGETED WEBSITES' panel
  onWebsitesAdded(websites) {
    const {targetedWebsitesList, selectedWebsitesList} = this.state;
    const newTargetedWebsites = targetedWebsitesList.concat(websites);
    const uncheckSelectedWebsites = intersection(newTargetedWebsites,
        this.state.selectedWebsitesList).length > 0;
    const newSelectedWebsitesList = uncheckSelectedWebsites
      ? [] : selectedWebsitesList;

    this.setState({
      targetedWebsitesList: uniq(targetedWebsitesList.concat(websites)),
      selectedWebsitesChecked: newSelectedWebsitesList.length > 0,
      selectedWebsitesList: newSelectedWebsitesList,
    }, () => {
      this.props.onTargetedWebsitesChange(this.state.targetedWebsitesList);
    });
  }

  // add all the selected websites from 'YOUR WEBSITES' to the 'TARGETED WEBSITES'
  onTargetSelectedWebsites() {
    const {selectedWebsitesList, targetedWebsitesList} = this.state;
    this.setState({
      targetedWebsitesList: uniq(selectedWebsitesList.concat(targetedWebsitesList)),
      selectedWebsitesList: [],
      selectedWebsitesChecked: false,
    }, () => {
      this.props.onTargetedWebsitesChange(this.state.targetedWebsitesList);
    });
  }

  // remove all the selected websites from 'TARGETED WEBSITES'
  onRemoveSelectedWebsites() {
    const {removableWebsitesList, targetedWebsitesList} = this.state;
    const targetsIntersection = intersection(removableWebsitesList,
      targetedWebsitesList);
    const newTargetedWebsitesList = targetedWebsitesList
      .filter(targeted => targetsIntersection
        .filter(item => item.name === targeted.name).length === 0);

    this.setState({
      targetedWebsitesList: uniq(newTargetedWebsitesList),
      removableWebsitesList: [],
      targetedWebsitesChecked: false,
    }, () => {
      this.props.onTargetedWebsitesChange(this.state.targetedWebsitesList);
    });
  }

  renderRestaurantFilterPanel() {
    return (
      <FiltersPanel
        multipleOwnerRegions={this.props.multipleOwnerRegions}
        isMultipleOwner={this.props.isMultipleOwner}
        isCoop={this.props.isCoop}
        coops={this.props.coops}
        selectedIdOwner={this.props.selectedIdOwner}
        selectedCoopId={this.props.selectedCoopId}
        openedSections={this.props.openedSections}
        states={this.props.states}
        cities={this.props.cities}
        objectives={this.props.objectives}
        facilities={this.props.facilities}
        events={this.props.events}
        selectedFilters={this.props.selectedFilters}
        title={this.props.filtersTitle}

        onOpenLoadFilters={this.props.onOpenLoadFilters}
        onOpenSaveFilters={this.props.onOpenSaveFilters}
        onClearSelectedFilters={this.props.onClearSelectedFilters}

        onQuickSearchChange={this.props.onQuickSearchChange}
        onOwnerChanged={this.props.onOwnerChanged}
        onCoopChanged={this.props.onCoopChanged}
        onLocationStateChange={this.props.onLocationStateChange}
        onLocationCityChange={this.props.onLocationCityChange}
        onObjectivesChange={this.props.onObjectivesChange}
        onFacilitiesChange={this.props.onFacilitiesChange}
        onEventsChange={this.props.onEventsChange}
      />);
  }

  renderCoopFilterPanel() {
    return (
      <FiltersPanelCoop
        openedSections={this.props.openedSections}
        events={this.props.events}
        selectedFilters={this.props.selectedFilters}

        onOpenLoadFilters={this.props.onOpenLoadFilters}
        onOpenSaveFilters={this.props.onOpenSaveFilters}
        onClearSelectedFilters={this.props.onClearSelectedFilters}

        onQuickSearchChange={this.props.onQuickSearchChange}
        onEventsChange={this.props.onEventsChange}
      />);
  }

  renderFilterPanel() {
    if (!this.props.publishCoop) {
      return this.renderRestaurantFilterPanel();
    }
    return this.renderCoopFilterPanel();
  }

  render() {
    return (
      <div className="AdvancedRestaurantSelection">
        {this.renderFilterPanel()}
        <WebsitesPanel
          websites={this.props.restaurants}
          selectedWebsitesList={this.state.selectedWebsitesList}
          targetedWebsitesList={this.state.targetedWebsitesList}
          selectedWebsitesChecked={this.state.selectedWebsitesChecked}
          title={this.props.websitesTitle}
          publishCoop={this.props.publishCoop}
          
          onWebsiteToggle={this.onWebsiteToggle.bind(this)}
          onSelectedWebsitesToggleAll={this.onSelectedWebsitesToggle.bind(this)}
          onTargetSelectedWebsites={this.onTargetSelectedWebsites.bind(this)}
          onWebsitesAdded={this.onWebsitesAdded.bind(this)}
        />

        <TargetedWebsitesPanel
          targetedWebsitesList={this.state.targetedWebsitesList}
          removableWebsitesList={this.state.removableWebsitesList}
          targetedWebsitesChecked={this.state.targetedWebsitesChecked}
          title={this.props.targetedWebsitesTitle}
          publishCoop={this.props.publishCoop}
          onRemoveSelectedWebsites={this.onRemoveSelectedWebsites.bind(this)}
          onTargetedWebsitesToggleAll={this.onTargetedWebsitesToggleAll.bind(this)}
          onRemovableToggle={this.onRemovableToggle.bind(this)}
        />
      </div>
    );
  }
}
