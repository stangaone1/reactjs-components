import React, {Component} from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext} from 'react-dnd';

import update from 'react/lib/update';
import {DragWidgetContainer, DragWidgetItem} from 'views/components/draggable-widgets';


import './item.scss';

const availableWidgets = [{
  widgetType: '1',
  type: 'widget',
  text: 'Write a cool JS library',
}, {
  widgetType: '2',
  type: 'widget',
  text: 'Make it generic enough',
}, {
  widgetType: '3',
  type: 'widget',
  text: 'Write README',
}, {
  widgetType: '4',
  type: 'widget',
  text: 'Create some examples',
}, {
  widgetType: '5',
  type: 'widget',
  text: 'Spam in Twitter and IRC to promote it',
}, {
  widgetType: '6',
  type: 'widget',
  text: '???',
}, {
  widgetType: '7',
  type: 'widget',
  text: 'PROFIT',
  multiple: true,
}];

const activeWidgets = [];

const boxStyle = {
  border: 'solid 1px green',
  padding: '20px',
};

let lastId = 999;

@dragDropContext(HTML5Backend)
export default class DragWidgetDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableWidgets,
      activeWidgets,
      availableComponents: availableWidgets.map((item) => ({...item, type: 'component'})),
      activeComponents: activeWidgets.map((item) => ({...item, type: 'component'})),
    };
  }

  findItemOfType(colection, widgetType) {
    return colection.filter((i) => i.widgetType === widgetType)[0];
  }

  isWidgetDisabled(type, widgetType) {
    const allW = this.findItemOfType(this.state[`available${type}`], widgetType);
    if (!allW) {
      return true;
    }
    if (allW.multiple) {
      return false;
    }
    const activeW = this.findItemOfType(this.state[`active${type}`], widgetType);
    if (activeW) {
      return true;
    }
    return false;
  }

  moveItem(type, oldIndex, newIndex) {
    const item = this.state[`active${type}`][oldIndex];
    this.setState(update(this.state, {
      [`active${type}`]: {
        $splice: [
          [oldIndex, 1],
          [newIndex, 0, item],
        ],
      },
    }));
  }

  defineNewId() {
    return ++lastId;
  }

  addItem(type, item, newIndex) {
    this.setState(update(this.state, {
      [`active${type}`]: {
        $splice: [
          [newIndex, 0, item],
        ],
      },
    }));
  }

  removeItem(type, oldId) {
    const item = this.state[`active${type}`].filter((i) => i.id === oldId)[0];
    if (!item) {
      return;
    }
    const index = this.state[`active${type}`].indexOf(item);
    this.setState(update(this.state, {
      [`active${type}`]: {
        $splice: [
          [index, 1],
        ],
      },
    }));
  }

  renderFull(type, props) {
    return (
      <div style={{...boxStyle, color: 'red'}}>
        full - {type} - {props.text}
      </div>
    );
  }

  render() {
    return (
      <div>
        <table width="100%">
          <tbody>

          <tr>
            <td>
              <h1>Widgets thumbnail</h1>
            </td>
            <td>
              <h1>Widgets full</h1>
            </td>
          </tr>
          <tr>
            <td width="50%">
              {this.state.availableWidgets.map((item, index) =>
                <DragWidgetItem
                  className="item-thumb"
                  type={item.type}
                  defineNewId={this.defineNewId.bind(this, 'Widgets')}
                  payload={item}
                  key={index}
                  style={boxStyle}
                  removeItem={this.removeItem.bind(this, 'Widgets')}
                >
                  {item.text}
                </DragWidgetItem>
              )}
            </td>
            <td width="50%">
              <DragWidgetContainer
                onMoveItem={this.moveItem.bind(this, 'Widgets')}
                accepts={['widget']}
                onAddItem={this.addItem.bind(this, 'Widgets')}
                itemList={this.state.activeWidgets}
                renderItem={this.renderFull.bind(this, 'Widgets')}
                removeItem={this.removeItem.bind(this, 'Widgets')}
              >
                empty container!
              </DragWidgetContainer>
            </td>
          </tr>
          <tr>
            <td>
              <h1>component thumbnail</h1>
            </td>
            <td>
              <h1>component full</h1>
            </td>
          </tr>
          <tr>
            <td width="50%">
              {this.state.availableComponents.map((item, index) =>
                <DragWidgetItem
                  key={index}
                  className="item-thumb"
                  type={item.type}
                  defineNewId={this.defineNewId.bind(this, 'Components')}
                  payload={item}
                  style={boxStyle}
                  removeItem={this.removeItem.bind(this, 'Components')}
                  key={index}>
                  {item.text}
                </DragWidgetItem>
              )}
            </td>
            <td width="50%">
              <DragWidgetContainer
                onMoveItem={this.moveItem.bind(this, 'Components')}
                accepts={['component']}
                onAddItem={this.addItem.bind(this, 'Components')}
                itemList={this.state.activeComponents}
                renderItem={this.renderFull.bind(this, 'Components')}
                removeItem={this.removeItem.bind(this, 'Components')}
              >

                empty container!
              </DragWidgetContainer>
            </td>
          </tr>
          </tbody>
        </table>


      </div>
    );
  }
}
