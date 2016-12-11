import React, {Component, PropTypes} from 'react';
import {findIndex} from 'lodash';
import {Button} from 'views/components/buttons';
import Panel, {PanelContent, PanelHeader} from 'views/components/panel';
import Checkbox from 'views/components/checkbox';
import DraggableCheckboxSource from './draggable-checkbox-source.jsx';
import {websitesCompare} from 'lib/utils/websitesCompar.js';

function isChecked(source, target) {
  return findIndex(source, (x) => x.id === target.id) >= 0;
}

export default class WebsitesPanel extends Component {
  static propTypes = {
    websites: PropTypes.array.isRequired,
    selectedWebsitesChecked: PropTypes.bool,

    selectedWebsitesList: PropTypes.array.isRequired,
    targetedWebsitesList: PropTypes.array.isRequired,

    onWebsiteToggle: PropTypes.func.isRequired,
    onTargetSelectedWebsites: PropTypes.func.isRequired,
    onSelectedWebsitesToggleAll: PropTypes.func.isRequired,
    onWebsitesAdded: PropTypes.func.isRequired,
    title: PropTypes.string,
    publishCoop: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      draggedItems: [],
    };
  }

  onBeginDrag(item) {
    const {selectedWebsitesList} = this.props;
    const index = findIndex(selectedWebsitesList, (t) => t.name === item.name);
    const draggedItems = index >= 0 ? selectedWebsitesList : [item];
    this.setState({ draggedItems });
  }

  render() {
    const {
      websites,
      onSelectedWebsitesToggleAll,
      selectedWebsitesChecked,
      onTargetSelectedWebsites,
      onWebsiteToggle,
      onWebsitesAdded,
      selectedWebsitesList,
      targetedWebsitesList,
      title,
      publishCoop,
    } = this.props;

    const targetText = publishCoop ? "Target Selected Coops" : "Target Selected Websites";
    return (
      <Panel>
        <PanelHeader
          title={title || (publishCoop ? "Your Coops" : "Your Websites")}
        >
          <span className="AdvancedSelectionHeader-info">
            ({websites.length})
          </span>
          <div className="AdvancedSelectionHeader-controls">
            <Checkbox
              onChange={onSelectedWebsitesToggleAll}
              checked={selectedWebsitesChecked}
            />

            <Button
              disabled={!selectedWebsitesChecked}
              onClick={onTargetSelectedWebsites}
              size="small"
            >
              {targetText}
            </Button>
          </div>
        </PanelHeader>

        <PanelContent>
          {websites.sort(websitesCompare).map((item, index) => {
            let text = item.restaurantCount ? `${item.restaurantCount} Restaurants` : item.city;
            return (
              <DraggableCheckboxSource
                onChange={onWebsiteToggle.bind(this, item)}
                onAdd={onWebsitesAdded}
                onBeginDrag={this.onBeginDrag.bind(this, item)}
                draggedItems={this.state.draggedItems}
                checked={isChecked(selectedWebsitesList, item)}
                done={isChecked(targetedWebsitesList, item)}
                label={item.name}
                text={text}
                key={index}
              />
            );
          })}
        </PanelContent>
      </Panel>
    );
  }
}
