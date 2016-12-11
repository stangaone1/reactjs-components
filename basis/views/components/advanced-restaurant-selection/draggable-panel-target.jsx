import React, {PropTypes} from 'react';
import { DropTarget as dropTarget } from 'react-dnd';
import {findIndex} from 'lodash';
import cx from 'classnames';
import {PanelContent} from 'views/components/panel';
import CheckboxSection from 'views/components/checkbox-section';
import {websitesCompare} from 'lib/utils/websitesCompar.js';

const boxTarget = {
  drop() {
    return { name: 'TargetedWebsites' };
  },
};

const ItemTypes = {
  BOX: 'CheckboxSection',
};

function isChecked(source, target) {
  return findIndex(source, (x) => x.name === target.name) >= 0;
}

@dropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class DraggablePanelTarget extends React.Component {
  static propTypes = {
    connectDropTarget: PropTypes.func,
    onRestaurantSelected: PropTypes.func.isRequired,
    onWebsiteToggle: PropTypes.func.isRequired,
    removableWebsitesList: PropTypes.array,
    websites: PropTypes.array,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    websites: [],
  };

  renderPreviewTargetHelper() {
    const {canDrop, isOver} = this.props;
    const containerClasses = cx('PreviewTargetHelper', {
      'PreviewTargetHelper--dropable': canDrop && isOver,
    });

    if (canDrop) {
      return (
        <div className={containerClasses}>
          <div className="PreviewTargetHelper--content">
            Drag your selected websites here
          </div>
        </div>
      );
    }
  }

  renderItems() {
    const {websites, removableWebsitesList, onWebsiteToggle} = this.props;

    if (websites.length > 0) {
      return websites.sort(websitesCompare).map((item, index) => {
        return (
          <CheckboxSection
            checked={isChecked(removableWebsitesList, item)}
            onChange={(checked) => onWebsiteToggle(item, checked)}
            key={index}
            label={item.name}
            text={item.city}
          />
        );
      });
    }
    return (
      <div className="DropableTutorial">
        <p className="Message">You don't have any targeted websites yet.</p>
        <p><i>First:</i> <br />Select the results you want from the left panel</p>
        <p>
          <i>Next:</i> <br />Click, hold and drag them over this area or
          click "Target Selected Websites"
        </p>
      </div>
    );
  }

  render() {
    const {canDrop, isOver} = this.props;
    const panelClasses = cx('PanelContent--dropbable', {
      'PanelContent--preview': canDrop,
      'PanelContent--isover': canDrop && isOver,
    });

    return this.props.connectDropTarget(
      <div style={{ 'position': 'relative' }}>
        {this.renderPreviewTargetHelper()}
        <PanelContent className={panelClasses}>
          {this.renderItems()}
        </PanelContent>
      </div>
    );
  }
}
