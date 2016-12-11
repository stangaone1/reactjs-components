/*eslint-disable */
import React, { cloneElement, Component, PropTypes } from 'react';
/*eslint-enable */
import { findDOMNode } from 'react-dom';
import { DragSource as dragSource, DropTarget as dropTarget} from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import cx from 'classnames';

const SORT_TYPE = 'SORT_TYPE';

const _dragSource = {
  canDrag(props) {
    return !props.disabled;
  },
  beginDrag(props, monitor, component) {
    const dragData = {
      id: props.id,
      index: props.index,
    };
    if (props.onDragStart) {
      props.onDragStart(dragData, component.props.children);
    }

    return dragData;
  },
  endDrag(props) {
    const data = {
      id: props.id,
      index: props.index,
    };
    if (props.onDragEnd) {
      props.onDragEnd(data);
    }
  },
};

const _dragTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    props.moveElement(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};

@dropTarget(SORT_TYPE, _dragTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@dragSource(SORT_TYPE, _dragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))
export default class SortableElement extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    moveElement: PropTypes.func.isRequired,
    children: PropTypes.any,
    className: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  render() {
    const {isDragging, connectDragSource, connectDropTarget} = this.props;
    const opacity = isDragging ? 0.4 : 1;
    const children = cloneElement(this.props.children, {
      style: Object.assign(
        {},
        this.props.children.props.style,
        {opacity: opacity}
      ),
      className: cx('Sort-element', this.props.children.props.className),
    });
    return connectDragSource(connectDropTarget(
      children
    ));
  }
}
