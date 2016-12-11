import React, {Component, PropTypes} from 'react';
import {debounce} from 'lodash';
import restaurantFiltersCounter from 'lib/utils/restaurant-filters-counter';
import {Button} from 'views/components/buttons';
import InputField from 'views/components/inputfield';

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

export default class FiltersPanelCoop extends Component {
  static propTypes = {
    openedSections: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
    selectedFilters: PropTypes.object.isRequired,

    onOpenLoadFilters: PropTypes.func.isRequired,
    onOpenSaveFilters: PropTypes.func.isRequired,
    onClearSelectedFilters: PropTypes.func.isRequired,
    onQuickSearchChange: PropTypes.func.isRequired,
    onEventsChange: PropTypes.func.isRequired,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      openedSections: null,
    };
    this.handleQuickSearch = debounce(props.onQuickSearchChange, 200);
    this.onOwnerChanged = this.onOwnerChanged.bind(this);
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
  render() {
    const searchInputIcon = <Icon name="search" />;
    const events = remapFilters(this.props.events);
    const filtersCount = restaurantFiltersCounter(this.props.selectedFilters);
    const openedSections = this.state.openedSections || this.props.openedSections;
    return (
      <Panel className="FiltersPanel">
        <PanelHeader
          title="Filters"
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
                  placeholder="Coop name may contain.."
                  onChange={this.handleQuickSearch}
                  iconLeft={searchInputIcon} />
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
