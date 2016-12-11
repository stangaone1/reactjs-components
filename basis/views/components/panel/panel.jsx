import React, {Component, PropTypes} from 'react';
import {PanelHeader, PanelContent} from './index.js';
import './panel.scss';

import classnames from 'classnames';

export default class Panel extends Component {

  static propTypes = {
    label: PropTypes.node,
    children: PropTypes.any,
    element: PropTypes.any,
    className: PropTypes.any,
    full: PropTypes.bool,
    withMargin: PropTypes.bool,
  };

  static defaultProps = {
    element: 'div',
    full: false,
  };

  renderContent() {
    if (this.props.label) {
      return [
        (<PanelHeader key="header">
          {this.props.label}
        </PanelHeader>),
        (<PanelContent key="content">
          {this.props.children}
        </PanelContent>),
      ];
    }
    return this.props.children;
  }

  render() {
    const classes = classnames(
      this.props.className,
      'Panel',
      {
        'Panel--full': this.props.full,
        'Panel--withMargin': this.props.withMargin,
      }
    );
    return (
      <this.props.element className={classes}>
        {this.renderContent()}
      </this.props.element>
    );
  }
}
