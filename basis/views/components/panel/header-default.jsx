import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class PanelHeaderDefault extends Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.any,
    title: PropTypes.string,
    description: PropTypes.string,
  };

  render() {
    const classes = classnames(this.props.className, 'PanelHeader', 'PanelHeaderDefault');
    const {title, description} = this.props;

    return (
      <div className={classes} key="header">
        {title ? <div className="PanelHeader-title">{title}</div> : null}
        {description ? <div className="PanelHeader-description">{description}</div> : null}
        {this.props.children}
      </div>
    );
  }
}
