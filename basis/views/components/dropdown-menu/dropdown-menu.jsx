import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './dropdown-menu.scss';


export default class DropdownMenu extends Component {
  render() {
    const {items} = this.props;
    const dropdownItems = items.map((item, i) => {
      if (item.type === 'header') {
        return (
          <li
           className={classNames('DropdownMenu-header', {'DropdownMenu-separator': item.separator})}
           key={'item-' + i}
          >
            {item.label}
          </li>
        );
      }

      return (
        <li
          key={'item-' + i}
          className={classNames('DropdownMenu-item', {
            'DropdownMenu-separator': item.separator,
            'DropdownMenu-disabled': item.disabled,
          })}
          onClick={item.disabled !== true ? this.props.onItemClick.bind(this, item.value, item.label) : null}>
            <span>
              {item.label}
            </span>
        </li>
      );
    });

    return (
      <ul className="DropdownMenu" role="menu">
        {dropdownItems}
      </ul>
    );
  }
}

DropdownMenu.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func,
};

DropdownMenu.defaultProps = {
  items: [],
  onItemClick: () => {},
};
