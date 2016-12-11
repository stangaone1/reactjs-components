import React, {Component, PropTypes} from 'react';
import cssClassBuilder from 'classnames';


import './side-preview.scss';

export default class SidePreviewSection extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    element: PropTypes.node,
  };

  static defaultProps = {
    element: 'div',
  };

  render() {
    return (
      <this.props.element
        className={cssClassBuilder('SidePreviewSection', this.props.className)}>
        {this.props.children}
      </this.props.element>
    );
  }
}
