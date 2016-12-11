import React, { PropTypes, Component } from 'react';
import { DropTarget as dropTarget} from 'react-dnd';
import cx from 'classnames';

import DragWidgetItem from './drag-widget-item';

import './drag-widget.scss';

const containerTarget = {
  hover(props, monitor) {
    if (props.itemList.length) {
      return;
    }
    const {payload } = monitor.getItem();
    props.onAddItem(payload, 0);
  },
  canDrop(props, monitor) {
    return props.accepts
      && props.accepts.length
      && props.accepts.indexOf(monitor.getItemType()) > -1;
  },
  drop(props, monitor, component) {
    const hasDroppedOnChild = monitor.didDrop();
    if (hasDroppedOnChild) {
      return;
    }
    component.setState({
      hasDropped: true,
      hasDroppedOnChild: hasDroppedOnChild,
    });
  },
};

@dropTarget(props => props.accepts, containerTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class DragWidgetContainer extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    lastDroppedItem: PropTypes.object,
    itemList: PropTypes.array,
    onAddItem: PropTypes.func.isRequired,
    onMoveItem: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
  };

  static defaultProps = {
    itemList: [],
  };

  constructor(props) {
    super(props);
    this.handleFindItem = this.findItem.bind(this);
  }

  findItem(id) {
    const { itemList } = this.props;
    let index = -1;
    let i;
    for (i = 0; i < itemList.length; i++) {
      if (itemList[i].id === id) {
        index = i;
        break;
      }
    }

    return {
      index,
      itemIsInContainer: index > -1,
      item: itemList[index],
    };
  }

  renderContent() {
    const {
      children,
      onMoveItem,
      onAddItem,
      removeItem,
      itemList,
      renderItem,
      accepts,
      } = this.props;

    if (!itemList.length) {
      return children;
    }

    return itemList.map((item, index) => {
      return (
        <DragWidgetItem
          isInContainer
          onMoveItem={onMoveItem}
          onAddItem={onAddItem}
          removeItem={removeItem}
          findItem={this.handleFindItem}
          type={accepts[0]}
          key={item.id}
          id={item.id}
          payload={item}
          accepts={accepts}
        >
          {renderItem(item, index)}
        </DragWidgetItem>
      );
    });
  }

  render() {
    const {
      children,
      accepts,
      isOver,
      canDrop,
      connectDropTarget,
      onMoveItem,
      onAddItem,
      defineNewId,
      removeItem,
      itemList,
      className,
      renderItem,
      ...props,
      } = this.props;

    const componentClasses = cx(
      'DragWidgetContainer', {
        'DragWidgetContainer--over': isOver,
        'DragWidgetContainer--canDrop': canDrop,
        'DragWidgetContainer--active': isOver && canDrop,
      }, className
    );

    return connectDropTarget(
      <div {...props} className={componentClasses}>
        {this.renderContent()}
      </div>
    );
  }
}
