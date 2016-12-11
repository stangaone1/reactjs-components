import React, {PropTypes} from 'react';
import { DragLayer as dragLayer } from 'react-dnd';
import CheckboxSection from 'views/components/checkbox-section';

@dragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
}))
export default class PreviewBox extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.string,
    itemsCount: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
  };

  render() {
    const {itemsCount, label, text} = this.props;

    if (itemsCount > 1) {
      return (
        <CheckboxSection
          className="PreviewBox PreviewBox--multiple"
          label={`${itemsCount} Restaurant Websites Selected`}
          text="Target selection"
          checked
        />
      );
    }

    return (
      <CheckboxSection
        className="PreviewBox"
        label={label}
        text={text}
        checked
      />
    );
  }
}
