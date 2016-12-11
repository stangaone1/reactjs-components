import React, {Component, PropTypes} from 'react';
import DraggablePanelTarget from './draggable-panel-target.jsx';
import Panel, {PanelHeader} from 'views/components/panel';
import {Button} from 'views/components/buttons';
import Checkbox from 'views/components/checkbox';

export default class TargetedWebsitesPanel extends Component {
  static propTypes = {
    targetedWebsitesList: PropTypes.array.isRequired,
    removableWebsitesList: PropTypes.array.isRequired,
    targetedWebsitesChecked: PropTypes.bool,

    onRemoveSelectedWebsites: PropTypes.func.isRequired,
    onTargetedWebsitesToggleAll: PropTypes.func.isRequired,

    onRemovableToggle: PropTypes.func.isRequired,
    title: PropTypes.string,
    publishCoop: PropTypes.bool,
  };

  render() {
    const {title, publishCoop} = this.props;
    const advancedText = publishCoop ? "Remove selected Coops" : "Remove Selected Websites";

    return (
      <Panel>
        <PanelHeader
          title={title || (publishCoop ? "Targeted Coops" : "Targeted Websites")}
        >
          <span className="AdvancedSelectionHeader-info">
            ({this.props.targetedWebsitesList.length})
          </span>
          <div className="AdvancedSelectionHeader-controls">
            <Checkbox
              onChange={this.props.onTargetedWebsitesToggleAll}
              checked={!!this.props.targetedWebsitesChecked}
            />
            <Button
              disabled={!this.props.targetedWebsitesChecked}
              onClick={this.props.onRemoveSelectedWebsites}
              size="small"
            >
              {advancedText}
            </Button>
          </div>
        </PanelHeader>

        <DraggablePanelTarget
          websites={this.props.targetedWebsitesList}
          removableWebsitesList={this.props.removableWebsitesList}
          onWebsiteToggle={this.props.onRemovableToggle}
          onRestaurantSelected={this.props.onTargetedWebsitesToggleAll}
        />
      </Panel>
    );
  }
}
