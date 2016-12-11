import React, { Component, PropTypes } from 'react';
import { DragLayer as dragLayer } from 'react-dnd';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

const SORT_TYPE = 'SORT_TYPE';

function snapToGrid(x, y) {
  const snappedX = Math.round(x / 32) * 32;
  const snappedY = Math.round(y / 32) * 32;

  return [snappedX, snappedY];
}

function getItemStyles(props) {
  const { initialOffset, currentOffset, width} = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;

  if (props.snapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }

  const transform = `translate(${x}px, ${y}px)`;
  return {
    width: width,
    transform: transform,
    WebkitTransform: transform,
  };
}

@dragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))
export default class SortableLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    isDragging: PropTypes.bool.isRequired,
    snapToGrid: PropTypes.bool.isRequired,
    children: PropTypes.any,
  };

  renderItem(type) {
    switch (type) {
    case SORT_TYPE:
      return (
        <div>
          {this.props.children}
        </div>
      );
    default:
      return null;
    }
  }

  render() {
    const {itemType, isDragging } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType)}
        </div>
      </div>
    );
  }
}
