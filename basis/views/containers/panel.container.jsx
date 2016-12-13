import React, {Component} from 'react';
import Panel, {PanelHeader} from 'views/components/panel';

export default class PanelContainer extends Component {
  render() {
    return (
      <div>
        <div>
          <Panel label="Panel Header">
            panel content
          </Panel>
        </div>

        <ul>
          <Panel element="li" label="Panel header" key="1">
            this is a panel with custom element <strong>li</strong>
          </Panel>
        </ul>

        <ul>
          <Panel element="li" key="1">
            <div style={{width: '100%', background: '#ccc'}}>
              custom header
            </div>
            <div>
              this is a panel with custom element <strong>li</strong> and custom header
            </div>
          </Panel>
        </ul>

        <Panel full withMargin>
          <PanelHeader
            title="Title is a prop"
            description="Description is also a prop"
          />
        </Panel>

      </div>
    );
  }
}
