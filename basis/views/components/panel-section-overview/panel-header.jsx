import React, {Component, PropTypes} from 'react';
import compileClass from 'classnames';

import {Button} from 'views/components/buttons';

import './panel-section-overview.scss';

export default class PanelHeaderPagePreview extends Component {
  static propTypes = {
    label: PropTypes.string,
    onEdit: PropTypes.func,
    status: PropTypes.bool,
  };

  render() {
    return (
      <div className={compileClass({Completed: this.props.status}, 'PanelHeaderPagePreview')}>
        <span className="PanelHeaderPagePreviewLabel">
          {this.props.label}
        </span>
        <span className="PanelHeaderPagePreviewStatus">
          {this.props.status ? 'Completed' : 'Not complete'}
        </span>
        <Button className="PanelHeaderPagePreviewAction" onClick={this.props.onEdit}>
          Edit
        </Button>
      </div>
    );
  }
}
