import React, {Component} from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext} from 'react-dnd';

import {Accordion,
  AccordionSection,
  AccordionSectionHeader,
  AccordionSectionBody,
  AccordionDropdown,
  AccordionDraggable} from 'views/components/accordion';
import Sortable from 'views/components/sortable';
import {Button} from 'views/components/buttons';
import { configure, addDecorator, setAddon, storiesOf } from '@kadira/storybook';

@dragDropContext(HTML5Backend)
export default class AccordionContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openedSectionsRegular: [],
      openedSectionsDraggable: [0],
      openedSectionsDropdown: [0],
      openedDropdown: true,
    };
  }

  toggleSectionRegular(toggledSection) {
    const indexes = Object.assign({}, this.state).openedSectionsRegular; // clone state
    const index = indexes.indexOf(toggledSection);

    if (index === -1) {
      indexes.push(toggledSection);
    } else {
      indexes.splice(index, 1);
    }
    this.setState({openedSectionsRegular: indexes});
  }

  toggleSectionDraggable(toggledSection) {
    this.setState({openedSectionsDraggable: [toggledSection]});
  }

  toggleSectionDropdown(toggledSection) {
    this.setState({openedSectionsDropdown: [toggledSection]});
  }

  toggleDropdown() {
    this.setState({openedDropdown: !this.state.openedDropdown});
  }

  render() {
    const containerStyle = {
      width: 800,
      margin: '20px 20px 10px 20px',
      padding: '1px 60px 20px 60px',
      background: 'white',
      boxShadow: '2px 2px 8px -3px gray',
      borderRadius: '10px',
    };

    return (
      <div>
        <div style={containerStyle}>
          <h3>Regular Accordion - <code>{'<Accordion>'}</code></h3>
          <Accordion
            openedSections={this.state.openedSectionsRegular}
            onSectionClick={this.toggleSectionRegular.bind(this)}
          >
            <AccordionSection>
              <AccordionSectionHeader>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</AccordionSectionHeader>
              <AccordionSectionBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse suscipit diam quis est condimentum faucibus. Fusce id ipsum dictum, hendrerit quam id, ultrices odio. Etiam dignissim dui ac auctor mattis. Vivamus elementum tellus enim, quis vulputate leo dictum quis. Cras sit amet tellus vitae massa tincidunt mattis vel eget sem. Mauris eleifend nunc eget odio fringilla pellentesque. Duis lobortis eu neque et mattis. Suspendisse eget eros mi. Praesent aliquam imperdiet bibendum. Phasellus tincidunt purus eget hendrerit auctor. Donec ipsum lacus, semper eu orci nec, eleifend finibus ipsum. Nunc commodo velit dolor, eu ornare leo consectetur et. Sed vehicula consequat nibh in viverra. Integer ante magna, lobortis in sollicitudin a, rhoncus et purus. Integer vehicula rhoncus dolor, eget porta augue.
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
                Duis lorem orci, molestie non faucibus a, pharetra eu ex. Cras commodo eleifend lectus id tincidunt. Curabitur suscipit volutpat tellus, id tincidunt lectus dapibus in. Aliquam sodales felis mi, sed pharetra quam mollis at. Maecenas eu enim nec arcu luctus vestibulum. Pellentesque eget dolor egestas, euismod lorem non, vulputate nulla. Sed id velit ac ligula consequat dapibus. Integer mauris nibh, aliquam in congue ut, posuere a massa. Praesent nec mauris non nunc convallis ultrices a nec lorem. Nulla id faucibus eros. Donec eleifend enim consectetur facilisis hendrerit.
              </AccordionSectionBody>
            </AccordionSection>
            <AccordionSection>
              <AccordionSectionHeader>Title 4</AccordionSectionHeader>
            <AccordionSectionBody>
                Random text
              </AccordionSectionBody>
            </AccordionSection>
          </Accordion>
        </div>
        <div style={containerStyle}>
          <h3>Accordion with draggable/sortable component - <code>{'<AccordionDraggable>'}</code></h3>
          <AccordionDraggable
            openedSections={this.state.openedSectionsDraggable}
            onSectionClick={this.toggleSectionDraggable.bind(this)}
          >
            <AccordionSection>
              <AccordionSectionHeader>Title 1</AccordionSectionHeader>
              <AccordionSectionBody>
                <Sortable>
                  <div>sortable item 0</div>
                  <div>sortable item 1</div>
                  <div>sortable item 2</div>
                  <div>sortable item 3</div>
                  <div>sortable item 4</div>
                  <div>sortable item 5</div>
                </Sortable>
              </AccordionSectionBody>
            </AccordionSection>
            <AccordionSection>
              <AccordionSectionHeader>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</AccordionSectionHeader>
              <AccordionSectionBody>
                <Sortable>
                  <div>sortable item 6</div>
                  <div>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                  <div>sortable item 8</div>
                </Sortable>
              </AccordionSectionBody>
            </AccordionSection>
            <AccordionSection>
              <AccordionSectionHeader>Title 2</AccordionSectionHeader>
              <AccordionSectionBody>
                <Sortable>
                  <div>sortable item 9</div>
                  <div>sortable item 10</div>
                  <div>sortable item 11</div>
                  <div>sortable item 12</div>
                </Sortable>
              </AccordionSectionBody>
            </AccordionSection>
          </AccordionDraggable>
        </div>
        <div style={Object.assign({}, containerStyle, {minHeight: 600})}>
          <h3>Accordion with dropdown - <code>{'<AccordionDropdown>'}</code></h3>
          <div>
            <Button onClick={this.toggleDropdown.bind(this)}>
              {this.state.openedDropdown ? 'Show' : 'Hide'} accordion
            </Button>
            <AccordionDropdown
              hidden={this.state.openedDropdown}
              openedSections={this.state.openedSectionsDropdown}
              onSectionClick={this.toggleSectionDropdown.bind(this)}
            >
              <AccordionSection>
                <AccordionSectionHeader>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</AccordionSectionHeader>
                <AccordionSectionBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse suscipit diam quis est condimentum faucibus. Fusce id ipsum dictum, hendrerit quam id, ultrices odio. Etiam dignissim dui ac auctor mattis. Vivamus elementum tellus enim, quis vulputate leo dictum quis. Cras sit amet tellus vitae massa tincidunt mattis vel eget sem. Mauris eleifend nunc eget odio fringilla pellentesque. Duis lobortis eu neque et mattis. Suspendisse eget eros mi. Praesent aliquam imperdiet bibendum. Phasellus tincidunt purus eget hendrerit auctor. Donec ipsum lacus, semper eu orci nec, eleifend finibus ipsum. Nunc commodo velit dolor, eu ornare leo consectetur et. Sed vehicula consequat nibh in viverra. Integer ante magna, lobortis in sollicitudin a, rhoncus et purus. Integer vehicula rhoncus dolor, eget porta augue.
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
                  Duis lorem orci, molestie non faucibus a, pharetra eu ex. Cras commodo eleifend lectus id tincidunt. Curabitur suscipit volutpat tellus, id tincidunt lectus dapibus in. Aliquam sodales felis mi, sed pharetra quam mollis at. Maecenas eu enim nec arcu luctus vestibulum. Pellentesque eget dolor egestas, euismod lorem non, vulputate nulla. Sed id velit ac ligula consequat dapibus. Integer mauris nibh, aliquam in congue ut, posuere a massa. Praesent nec mauris non nunc convallis ultrices a nec lorem. Nulla id faucibus eros. Donec eleifend enim consectetur facilisis hendrerit.
                </AccordionSectionBody>
              </AccordionSection>
              <AccordionSection>
                <AccordionSectionHeader>Title 4</AccordionSectionHeader>
                <AccordionSectionBody>
                  Random text
                </AccordionSectionBody>
              </AccordionSection>
            </AccordionDropdown>
          </div>
          <br />Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    );
  }
}
