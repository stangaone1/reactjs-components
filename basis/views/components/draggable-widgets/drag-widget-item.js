import React, { PropTypes, Component } from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import cx from 'classnames';
import invariant from 'invariant';

import './drag-widget.scss';

let lastOverId = false;

const itemSource = {
  canDrag(props) {
    return !props.disabled;
  },
  beginDrag(props) {
    lastOverId = false;
    const id = isFinite(props.id) ? props.id : props.defineNewId();
    return {
      id,
      type: props.type,
      harakiri() {
        if (!props.id) {
          props.removeItem(id);
        }
      },
      onDrop: props.onDrop,
      payload: {
        ...props.payload,
        id,
      },
    };
  },
  endDrag(props, monitor) {
    lastOverId = false;
    const hasDroppedOnChild = monitor.didDrop();
    if (!hasDroppedOnChild) {
      monitor.getItem().harakiri();
    }
    if (props.onDrop) {
      props.onDrop();
    }
  },
};


const itemTarget = {
  canDrop(props, monitor) {
    return monitor.getItemType() === props.type;
  },

  hover(props, monitor) {
    if (!props.isInContainer) {
      return;
    }

    const { id: overId } = props;
    if (lastOverId === overId) {
      return;
    }

    lastOverId = overId;

    const { id: draggedId, payload } = monitor.getItem();

    if (draggedId !== overId) {
      const { index: overIndex } = props.findItem(overId);
      if (overIndex !== -1) {
        const { index: draggedIndex } = props.findItem(draggedId);
        if (draggedIndex === -1) {
          props.onAddItem(payload, overIndex);
        } else {
          props.onMoveItem(draggedIndex, overIndex);
        }
      }
    }
  },
};

@dropTarget(props => props.accepts || props.type, itemTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
@dragSource(props => props.type, itemSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  clientOffset: monitor.getClientOffset(),
  monitor: monitor,
}))
export default class DragWidgetItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string),
    canDrop: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    findItem: PropTypes.func,
    onAddItem: PropTypes.func,
    onMoveItem: PropTypes.func,
    removeItem: PropTypes.func,
    defineNewId: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    isInContainer: PropTypes.bool,
  };

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      type,
      removeItem,
      findItem,
      onAddItem,
      onMoveItem,
      defineNewId,
      children,
      className,
      isOver,
      canDrop,
      isInContainer,
      id,
      monitor,
      disabled,
      ...otherProps,
      } = this.props;

    invariant(isInContainer || !!defineNewId,
      'missing defineNewId function prop on DragWidgetItem'
    );

    invariant(isInContainer || !!removeItem,
      'missing removeItem function prop on DragWidgetItem'
    );

    const draggedItem = monitor.getItem();

    const componentClasses = cx(
      'DragWidgetItem', {
        'DragWidgetItem--dragging': canDrop && draggedItem && draggedItem.id === id,
        'DragWidgetItem--canDrop': canDrop,
        'DragWidgetItem--disabled': disabled,
      }, className
    );

    return connectDragSource(connectDropTarget(
      <div {...otherProps} className={componentClasses}>
        {children}
      </div>
    ));
  }
}
