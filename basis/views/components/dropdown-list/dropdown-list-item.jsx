import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import cx from 'classnames';

export default class DropdownListItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    children: React.PropTypes.node,
    className: PropTypes.string,
    bulk: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps) {
    return shallowCompare(this, nextProps);
  }

  onClick() {
    this.props.onClick(this.props.id);
  }

  renderCheck() {
    if (this.props.active) {
      return <div className="DropdownList-Item-Check">&#10004;</div>;
    }
  }

  renderChildren() {
    if (this.props.children) {
      return <p className="DropdownList-Item-Body">{this.props.children}</p>;
    }
  }

  render() {
    const { title, active, bulk, className } = this.props;

    const dropdownListItemClasses = {
      'DropdownList-Item': true,
      'DropdownList-Item-Stack': bulk,
      'DropdownList-Item--active': active,
    };

    return (
      <li className={cx(dropdownListItemClasses, className)} onClick={this.onClick.bind(this)}>
        {this.renderCheck()}
        <h3 className="DropdownList-Item-Title">{title}</h3>
        {this.renderChildren()}
      </li>
    );
  }
}
