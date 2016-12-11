import React, {cloneElement, Component, PropTypes } from 'react';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';
import invariant from 'invariant';

import SortableLayer from './sortable-layer';
import SortableElement from './sortable-element';

export default class Sortable extends Component {
  static propTypes = {
    onSort: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragStart: PropTypes.func,
    children: PropTypes.any,
    draggingClassName: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    draggingClassName: 'Sort-element--dragging',
  }

  constructor(props) {
    super(props);
    this.getSortableChildren = this.getSortableChildren.bind(this);
    this.getSortableChildrenIds = this.getSortableChildrenIds.bind(this);
    this.moveElement = this.moveElement.bind(this);
    this.handleSnapToGridWhileDraggingChange = this.handleSnapToGridWhileDraggingChange.bind(this);
    this.onDragStart = this.onDragStart.bind(this);

    this.state = {
      snapToGridAfterDrop: false,
      snapToGridWhileDragging: false,
      currentDragElement: null,
      sortDragWidth: 0,
    };
  }

  componentWillMount() {
    this.setState({
      sortableElementsIds: this.getSortableChildrenIds(),
    });
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    setTimeout(() => {
      this.setState({sortDragWidth: findDOMNode(this).offsetWidth});
    });
  }

  componentWillUpdate(nextProps) {
    if (this.props.children !== nextProps.children) {
      this.setState({
        sortableElementsIds: this.getSortableChildrenIds(nextProps.children),
      });
    }
  }

  onDragStart(data, dragComponent) {
    this.setState({
      currentDragElement: dragComponent,
    }, ()=> {
      if (this.props.onDragStart) {
        this.props.onDragStart(data);
      }
    });
  }

  getSortableChildren() {
    const {onDragStart, ...props} = this.props;
    return this.state.sortableElementsIds.map((sortElementId, sortIndex)=> {
      let child;
      React.Children.forEach(this.props.children, (sortableElement, index)=> {
        const id = this.state.sortableElementsIds[sortableElement.id] || index;
        if (sortElementId === id) {
          child = (
            <SortableElement
              key={`sortableElement_${sortableElement.key || index}`}
              id={id}
              index={sortIndex}
              moveElement={this.moveElement}
              disabled={sortableElement.props.disabled}
              onDragStart={this.onDragStart}
              {...props}>
              {sortableElement}
            </SortableElement>);
        }
      });
      return child;
    });
  }

  getSortableChildrenIds(children = this.props.children) {
    return React.Children.map(children, (sortableElement, index)=> {
      return sortableElement.props.id || index;
    });
  }

  handleSnapToGridWhileDraggingChange() {
    this.setState({
      snapToGridWhileDragging: !this.state.snapToGridWhileDragging,
    });
  }

  moveElement(dragIndex, hoverIndex) {
    const sortableElementsIds = this.state.sortableElementsIds;
    const dragElement = sortableElementsIds[dragIndex];
    sortableElementsIds.splice(dragIndex, 1);
    sortableElementsIds.splice(hoverIndex, 0, dragElement);
    this.setState({
      sortableElementsIds: sortableElementsIds,
    }, ()=> {
      if (this.props.onSort) {
        this.props.onSort(this.state.sortableElementsIds);
      }
    });
  }

  render() {
    const {children,
      draggingClassName,
      className,
      onDragEnd,
      ...otherProps} = this.props;

    if (children === null || typeof children === 'undefined') {
      invariant(false, 'Must provide children that u want to be sortable');
      return null;
    } else if (React.Children.count(children) < 2) {
      invariant(false, 'Must provide at least two child elements for sort');
      return null;
    }
    const sortableChildren = this.getSortableChildren();
    const {snapToGridWhileDragging, sortDragWidth} = this.state;
    const previewComponent = this.state.currentDragElement ? cloneElement(this.state.currentDragElement, {
      style: {},
      className: draggingClassName,
    }) : null;
    return (
      <div {...otherProps} className={cx('Sort', className)}>
        <SortableLayer snapToGrid={snapToGridWhileDragging} width={sortDragWidth}>
          {previewComponent}
        </SortableLayer>
        {sortableChildren}
      </div>
    );
  }
}
