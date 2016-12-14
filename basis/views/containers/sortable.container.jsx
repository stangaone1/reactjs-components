import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext} from 'react-dnd';

import Sortable from 'views/components/sortable';

import './sortable.scss';

@dragDropContext(HTML5Backend)
export default class SortableContainer extends Component {

  onSort(orderData) {
    console.log('onSort', orderData);
  }

  onDragStart(dragData) {
    console.log('beginDrag', dragData);
  }

  onDragEnd(dragData) {
    console.log('endDrag', dragData);
  }

  onHoverTarget(targetData) {
    console.log('endDrag', targetData);
  }

  render() {
    const style = {
      border: '1px dashed gray',
      padding: '0.5rem 1rem',
      marginBottom: '.5rem',
      backgroundColor: 'white',
      cursor: 'move',
    };

    return (
      <div>
        <Sortable onDragStart={this.onDragStart.bind(this)}
                  onDragEnd={this.onDragEnd.bind(this)}
                  onSort={this.onSort.bind(this)}
                  draggingClassName="Sort-element--dragging"
                  >
          <div style={style}><span>sdasdas</span>sortsort 0</div>
          <div disabled style={style}>sort 1</div>
          <div disabled style={style}>sort 2</div>
          <div disabled style={style}>sort 3</div>
          <div disabled style={style}>sort 4</div>
          <div disabled style={style}><span>sdasdas</span>sortsort 0</div>
          <div disabled style={style}><span>sdasdas</span>sortsort 0</div>
          <div disabled style={style}><span>sdasdas</span>sortsort 0</div>
        </Sortable>
      </div>
    );
  }
}
