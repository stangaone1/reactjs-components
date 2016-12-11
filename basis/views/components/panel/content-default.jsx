import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class PanelContentDefault extends Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.any,
    noPadding: PropTypes.bool,
  };

  static defaultProps = {
    noPadding: false,
  }

  render() {
    const classes = classnames(
      {
        'PanelContent': true,
        'PanelContentDefault': true,
        'PanelContent--noPadding': this.props.noPadding,
      },
      this.props.className,
    );

    return (
      <div className={classes} key="content">
        {this.props.children}
      </div>
    );
  }
}
