import React, {Component} from 'react';
import ContentWidget, {widgets} from 'views/components/content-widget';
import {Button} from 'views/components/buttons';
import {cloneDeep} from 'lodash';


export default class ContentWidgetContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedWidgetType: Object.keys(widgets)[0],
      widgets: localStorage.getItem('widgetDemoShowcase') && JSON.parse(localStorage.getItem('widgetDemoShowcase')) || {},
    };
  }

  setSelectedWidgetType(e) {
    this.setState({
      selectedWidgetType: e.target.value,
    });
  }

  addWidget() {
    const widgetType = this.state.selectedWidgetType;
    let widgetName = widgetType;

    while (this.state.widgets.hasOwnProperty(widgetName)) {
      widgetName = widgetName + '1';
    }

    const newState = cloneDeep(this.state);

    newState.widgets[widgetName] = {
      type: widgetType,
      value: void 0,
    };

    this.setState(newState);

    localStorage.setItem('widgetDemoShowcase', JSON.stringify(newState.widgets));
  }

  onRemove(field) {
    const newState = cloneDeep(this.state);
    delete newState.widgets[field];
    this.setState(newState);
    localStorage.setItem('widgetDemoShowcase', JSON.stringify(newState.widgets));
  }

  onChange(field, value) {
    const newState = cloneDeep(this.state);
    newState.widgets[field].value = value;

    this.setState(newState);

    localStorage.setItem('widgetDemoShowcase', JSON.stringify(newState.widgets));
  }

  render() {
    return (
      <div>
        <select onChange={this.setSelectedWidgetType.bind(this)}>
          {Object.keys(widgets).map((w) => {
            return (
              <option value={w}>{w}</option>
            );
          })}
        </select>
        <Button onClick={this.addWidget.bind(this)}>Add this widget</Button>
        <br/><br/><br/>
        {Object.keys(this.state.widgets)
          .filter((w) => this.state.widgets[w])
          .map((wid) => {
            return (
              <div key={wid} style={{width: '640px', display: 'inline-block', margin: '10px'}}>
                <ContentWidget
                  type={this.state.widgets[wid].type}
                  defaultValue={this.state.widgets[wid].value}
                  value={this.state.widgets[wid].value}
                  onChange={this.onChange.bind(this, wid)}
                  onRemove={this.onRemove.bind(this, wid)}
                />
                <br/>
              <pre>
              {JSON.stringify(this.state.widgets[wid].value, void 0, 4)}
              </pre>
              </div>
            );
          })}

      </div>
    );
  }
}
