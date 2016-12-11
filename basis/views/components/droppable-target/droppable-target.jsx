import React, {cloneElement, createElement, Component, PropTypes} from 'react';
import { DropTarget as dropTarget} from 'react-dnd';
import {curry, isArray, isObject, has, noop} from 'lodash';

const hasDisplayName = curry((displayName, item) => {
  return item && item.type && item.type.displayName
    ? item.type.displayName === displayName
    : false;
});

const cloneDropable = (dropable, connection = noop) => {
  if (has(dropable, 'props.children')) {
    return React.Children.map(dropable.props.children, (child) => {
      if (typeof(child) === 'string') {
        return createElement('div', null, child);
      }
      return cloneElement(child, {connection});
    });
  }
  return null;
};

const boxTarget = {
  drop(props, monitor, component) {
    const children = monitor.getItem().component.props.children;
    const isDraggableContent = hasDisplayName('DraggableContent');
    const isDraggablePreview = hasDisplayName('DragLayer(DraggablePreview)');
    let preview = null;

    // check if has more than one child and if has a content and/or a preview
    if (isArray(children)) {
      // extract the content and the preview children
      const contentChild = children.filter(isDraggableContent);
      const previewChild = children.filter(isDraggablePreview);
      // if it has a content or a preview child, extract only the first one
      if (previewChild.length) {
        preview = cloneDropable(previewChild[0], props.onData);
      } else if (contentChild.length) {
        preview = cloneDropable(contentChild[0], props.onData);
      }
    } else if (isObject(children) && !isArray(children)) {
      const contentChild = isDraggableContent(children);
      const previewChild = isDraggablePreview(children);
      // build a preview element only if the child is a 'DraggalbePreview'
      // or a `DraggableContent`
      if (previewChild) {
        preview = cloneDropable(children);
      } else if (contentChild) {
        preview = cloneDropable(children);
      }
    }

    if (preview) {
      const {dropables, ...state} = component.state;
      component.setState({
        dropables: dropables.concat(preview),
        ...state,
      });
    }
  },

  canDrop(props, monitor) {
    const item = monitor.getItem();
    return item.target ? (props.accept.indexOf(item.target) >= 0) : false;
  },
};

@dropTarget('Element', boxTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class extends Component {
  static propTypes = {
    accept: PropTypes.array.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    children: PropTypes.element,
  };

  constructor(props) {
    super(props);
    this.state = {
      dropables: [],
    };
  }

  render() {
    // hardcoded
    const styles = {
      'height': '500px',
      'width': '100%',
      'border': '1px solid gray',
    };

    return this.props.connectDropTarget(
      <div style={styles}>
        {this.state.dropables.map((item, index) => {
          return (
            <div key={index}>{item}</div>
          );
        })}
      </div>
    );
  }
}
