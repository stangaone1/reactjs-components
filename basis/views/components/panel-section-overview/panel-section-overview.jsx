import React, {Component, PropTypes} from 'react';
import compileClass from 'classnames';

import Panel, {PanelContent} from 'views/components/panel';
import PreviewHeader from './panel-header.jsx';

import './panel-section-overview.scss';

export default class PanelPagePreview extends Component {
  static propTypes = {
    onEdit: PropTypes.func,
    section: PropTypes.shape({
      name: PropTypes.string,
      onEdit: PropTypes.func,
      pages: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        completed: PropTypes.bool,
      })),
    }).isRequired,
  };


  render() {
    const {section} = this.props;

    return (
      <Panel className="PanelPagePreview">
        <PreviewHeader
          label={section.name}
          status={section.completed}
          onEdit={this.props.onEdit.bind(this, section.id, section)}/>
        <PanelContent>
          <ul className="PanelPagePreview-PageList">
            {
              section.pages.map((page, index) =>{
                return (
                <li
                  key={index}
                  className={compileClass(page.completed ? 'Completed' : 'Incomplete', 'PanelPagePreview-Page')}
                >
                  {page.name}
                </li>
                );
              })
            }
          </ul>
        </PanelContent>
      </Panel>
    );
  }
}
