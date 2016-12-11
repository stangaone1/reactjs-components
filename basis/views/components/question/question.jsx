import React, {Component, PropTypes} from 'react';

import './question.scss';

export default class Question extends Component {
  static propTypes = {
    hasDivider: PropTypes.bool,
    children: PropTypes.any,
  };

  static defaultProps = {
    hasDivider: true,
  };

  renderDivider(hasDivider) {
    if (hasDivider) {
      return (<hr className="Question-divider"/>);
    }
  }

  render() {
    return (
      <div className="Question">
        {this.props.children}
        {this.renderDivider(this.props.hasDivider)}
      </div>
    );
  }
}
