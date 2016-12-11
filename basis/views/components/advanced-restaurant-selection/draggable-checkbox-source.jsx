import React, {PropTypes} from 'react';
import { DragSource as dragSource } from 'react-dnd';
import CheckboxSection from 'views/components/checkbox-section';
import PreviewBox from './draggable-preview-box.jsx';

const boxSource = {
  canDrag(props) {
    return props.done === false;
  },

  beginDrag(props) {
    props.onBeginDrag();
    return {
      name: props.label,
      text: props.text,
    };
  },

  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.onAdd(props.draggedItems);
    }
  },
};

const ItemTypes = {
  BOX: 'CheckboxSection',
  PREVIEW: 'Preview',
};

@dragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  clientOffset: monitor.getClientOffset(),
}))
export default class DraggableCheckboxSource extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onAdd: PropTypes.func,
    text: PropTypes.string,
    checked: PropTypes.bool,
    done: PropTypes.bool,
    connectDragSource: PropTypes.func,
    connectDragPreview: PropTypes.func,
    onBeginDrag: PropTypes.func,
    draggedItems: PropTypes.array,
  };

  static defaultProps = {
    onAdd: () => {},
  };

  renderPreview() {
    const previewPosition = {
      'position': 'absolute',
      'top': '0',
      'width': '100%',
      'zIndex': '-1',
    };

    return this.props.connectDragPreview(
      <div style={previewPosition}>
        <PreviewBox
          label={this.props.label}
          text={this.props.text}
          itemsCount={this.props.draggedItems.length}
        />
      </div>
    );
  }

  render() {
    return this.props.connectDragSource(
      <div className="CheckboxSectionDrag">
        <CheckboxSection
          checked={this.props.checked || this.props.done}
          onChange={this.props.onChange}
          done={this.props.done}
          label={this.props.label}
          text={this.props.text}
        />

        {this.renderPreview()}
      </div>
    );
  }
}
