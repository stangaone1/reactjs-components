import React, {Component} from 'react';
import TableFilters from 'views/components/table-filters';
import {
  Accordion,
  AccordionSection,
  AccordionSectionHeader,
  AccordionSectionBody,
} from 'views/components/accordion';

const defaultColumns = [
  {
    selectable: true,
    fixed: true,
    alwaysVisible: true,
  }, {
    name: 'Main menu',
    row: 'mainMenu',
    fixed: true,
    alwaysVisible: true,
    sortable: true,
  }, {
    name: 'Submenu title',
    row: 'subMenu',
    fixed: true,
    alwaysVisible: true,
    sortable: true,
  }, {
    name: 'Edited by',
    row: 'logs',
  }, {
    name: 'Created',
    row: 'created',
    sortable: true,
  }, {
    name: 'Last modified',
    row: 'edited',
    width: 100,
    sortable: true,
  }, {
    name: 'Start date',
    row: 'startDate',
    hidden: true,
    sortable: true,
  }, {
    name: 'End date',
    row: 'endDate',
    hidden: true,
    sortable: true,
  }, {
    name: 'Target websites',
    hidden: false,
    row: 'restaurants',
  }, {
    name: 'Actions',
    row: 'actions',
    alwaysVisible: true,
    fixed: true,
  },
];

export default class TableFiltersContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: defaultColumns,
      sortKey: 'mainMenu',
      sortValue: 'ASC',
      openAccordions: [0],
    };
  }

  handleSortChange(key, value) {
    this.setState({
      sortKey: key,
      sortValue: value,
    });
  }

  handleColumnChange(columns) {
    this.setState({columns});
  }

  toggleAccordions(toggledSection) {
    this.setState({
      openAccordions: [toggledSection],
    });
  }

  renderAccordion() {
    return (
      <Accordion
        openedSections={this.state.openAccordions}
        onSectionClick={this.toggleAccordions.bind(this)}
      >
        <AccordionSection>
          <AccordionSectionHeader>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua</AccordionSectionHeader>
          <AccordionSectionBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse suscipit diam quis est condimentum
            faucibus. Fusce id ipsum dictum, hendrerit quam id, ultrices odio. Etiam dignissim dui ac auctor mattis.
            Vivamus elementum tellus enim, quis vulputate leo dictum quis. Cras sit amet tellus vitae massa
            tincidunt mattis vel eget sem. Mauris eleifend nunc eget odio fringilla pellentesque. Duis lobortis eu
            neque et mattis. Suspendisse eget eros mi. Praesent aliquam imperdiet bibendum. Phasellus tincidunt
            purus eget hendrerit auctor. Donec ipsum lacus, semper eu orci nec, eleifend finibus ipsum. Nunc commodo
            velit dolor, eu ornare leo consectetur et. Sed vehicula consequat nibh in viverra. Integer ante magna,
            lobortis in sollicitudin a, rhoncus et purus. Integer vehicula rhoncus dolor, eget porta augue.
          </AccordionSectionBody>
        </AccordionSection>
        <AccordionSection>
          <AccordionSectionHeader>Title 2</AccordionSectionHeader>
          <AccordionSectionBody>
            Proin turpis erat, hendrerit a condimentum quis, rutrum nec ante.
          </AccordionSectionBody>
        </AccordionSection>
        <AccordionSection>
          <AccordionSectionHeader>Title 3</AccordionSectionHeader>
          <AccordionSectionBody>
            Duis lorem orci, molestie non faucibus a, pharetra eu ex. Cras commodo eleifend lectus id tincidunt.
            Curabitur suscipit volutpat tellus, id tincidunt lectus dapibus in. Aliquam sodales felis mi, sed
            pharetra quam mollis at. Maecenas eu enim nec arcu luctus vestibulum. Pellentesque eget dolor egestas,
            euismod lorem non, vulputate nulla. Sed id velit ac ligula consequat dapibus. Integer mauris nibh,
            aliquam in congue ut, posuere a massa. Praesent nec mauris non nunc convallis ultrices a nec lorem.
            Nulla id faucibus eros. Donec eleifend enim consectetur facilisis hendrerit.
          </AccordionSectionBody>
        </AccordionSection>
        <AccordionSection>
          <AccordionSectionHeader>Title 4</AccordionSectionHeader>
          <AccordionSectionBody>
            Random text
          </AccordionSectionBody>
        </AccordionSection>
      </Accordion>
    );
  }

  render() {
    const {sortKey, sortValue, columns} = this.state;
    const accordion = this.renderAccordion();

    return (
      <div>
        <h2>Full demo:</h2>
        <TableFilters
          sortKey={sortKey}
          sortValue={sortValue}
          columns={defaultColumns}
          onSortChange={this.handleSortChange.bind(this)}
          onViewChange={this.handleColumnChange.bind(this)}
          activeFilterCount={4}
          onFilterClear={(e) => {
            e.stopPropagation();
            console.log('clearing filters');
          }}
        >
          {accordion}
        </TableFilters>

        <br/>
        <h2>Ignored 'filter' column demo:</h2>

        <TableFilters
          ignoreColumns={'filter'}
          sortKey={sortKey}
          sortValue={sortValue}
          columns={defaultColumns}
          onSortChange={this.handleSortChange.bind(this)}
          onViewChange={this.handleColumnChange.bind(this)}
          activeFilterCount={4}
          onFilterClear={(e) => {
            e.stopPropagation();
            console.log('clearing filters');
          }}
        >
          {accordion}
        </TableFilters>

        <pre>
          sortKey: {sortKey}
          <br/>
          sortValue: {sortValue}
          <br/><br/>
          columns: {JSON.stringify(columns, null, 4)}
        </pre>
      </div>
    );
  }
}
