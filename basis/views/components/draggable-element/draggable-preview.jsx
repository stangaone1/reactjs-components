import React, {Component, PropTypes} from 'react';
import { DragLayer as dragLayer } from 'react-dnd';

import './draggable-preview.scss';

@dragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
}))
export default class extends Component {
  static displayName = 'DraggablePreview';

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className="DraggablePreview">{this.props.children}</div>
    );
  }
}
