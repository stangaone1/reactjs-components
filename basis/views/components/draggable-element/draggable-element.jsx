import React, {Component, PropTypes} from 'react';
import { DragSource as dragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import cx from 'classnames';
import {curry, isObject, isArray} from 'lodash';

const hasDisplayName = curry((displayName, item) => {
  return item && item.type && item.type.displayName
    ? item.type.displayName === displayName
    : false;
});

// do we need 3 consecutive iterations just to test a prop?
// TODO: refactor by removing unnecessary iterations
const hasDraggablePreview = (children) => {
  if (isArray(children)) {
    return children
      .filter(item => typeof(item.type) === 'object')
      .filter(item => typeof item.type.DecoratedComponent === 'object')
      .filter(item => item.type.DecoratedComponent.displayName === 'DraggablePreview')
      .length;
  }
  return false;
};

const boxSource = {
  beginDrag(props, monitor, component) {
    return {
      target: props.target,
      component,
    };
  },
};

@dragSource('Element', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  clientOffset: monitor.getClientOffset(),
  monitor: monitor,
}))
export default class extends Component {
  static displayName = 'DraggableElement';

  static propTypes = {
    connectDragSource: PropTypes.func,
    connectDragPreview: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element,
    ]),
    className: PropTypes.string,
    target: PropTypes.string.isRequired,
  };

  componentDidMount() {
    // only `connectDragPreview` the component has a `DraggablePreview`
    if (hasDraggablePreview(this.props.children)) {
      this.props.connectDragPreview(getEmptyImage(), {
        captureDraggingState: true,
      });
    }
  }

  renderContent() {
    const {children} = this.props;
    if (isArray(children)) {
      return children.filter(hasDisplayName('DraggableContent'));
    }
    return children;
  }

  renderPreview() {
    const {children, connectDragPreview} = this.props;
    const isDraggablePreview = hasDisplayName('DragLayer(DraggablePreview)');

    // if has an array of children, check if it has `DraggablePreview`
    if (isArray(children)) {
      const previewContainer =
        children.filter(isDraggablePreview);
      if (previewContainer.length) {
        return connectDragPreview(
          <div>{previewContainer}</div>
        );
      }
    // or if it has only one child, check if it's also a `DraggablePreview`
    } else if (isObject(children) && !isArray(children)) {
      if (isDraggablePreview(children)) {
        return connectDragPreview(
          <div>{children}</div>
        );
      }
    }
  }

  render() {
    const elementClasses = cx(this.props.className);

    return this.props.connectDragSource(
      <div className={elementClasses}>
        {this.renderContent()}
        {this.renderPreview()}
      </div>
    );
  }
}
