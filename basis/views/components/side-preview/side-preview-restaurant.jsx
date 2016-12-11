import React, {Component, PropTypes} from 'react';
import {SidePreviewSection} from './index';
import cssClassBuilder from 'classnames';
import './side-preview-restaurant.scss';

export default class SidePreviewRestaurant extends Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
  };

  renderElement(value, cssClass) {
    if (value) {
      return (
        <div className={'SidePreviewRestaurant-' + cssClass}>{value}</div>
      );
    }
  }

  renderChildren(children) {
    if (children) {
      return (
        <div className="SidePreviewRestaurant-Content">
          {children}
        </div>
      );
    }
  }

  render() {
    return (
      <SidePreviewSection className={cssClassBuilder('SidePreviewRestaurant', this.props.className)}>
        {this.renderElement(this.props.title, 'Title')}
        {this.renderElement(this.props.subtitle, 'Subtitle')}
        {this.renderChildren(this.props.children)}
      </SidePreviewSection>
    );
  }
}
