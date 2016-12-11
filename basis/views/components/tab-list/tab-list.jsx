import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import invariant from 'invariant';
import {flatten} from 'lodash';

import Tab from './tab';
import restrictedCompare from 'lib/utils/restricted-compare';
import TabListAside from './tab-list-aside';

import './tab-list.scss';

export default class TabList extends Component {
  static propTypes = {
    onTabChanged: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    selectedIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    disabledIndexes: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ])
    ),
  };

  static defaultProps = {
    selectedIndex: 0,
    disabledIndexes: [],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this.props.selectedIndex) {
      if (this.props.onTabChanged) {
        this.props.onTabChanged(nextProps.selectedIndex);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return restrictedCompare(this, nextProps, nextState);
  }

  checkType(elements, childType) {
    const elems = flatten(elements);
    return elems.filter((child) => {
      return child.type === childType;
    });
  }

  getChildOfType(childType) {
    invariant(childType, 'Need child type bro!');
    const { children = [] } = this.props;
    return this.checkType(children, childType);
  }

  createTabs(tabsChildren) {
    return React.Children.map(tabsChildren, (tab, index) => {
      let disabled = false;
      let selected = false;

      if (tab.props.disabled
          || this.props.disabledIndexes.indexOf(index) !== -1
          || this.props.disabledIndexes.indexOf(tab.key) !== -1) {
        disabled = true;
      }

      if (this.props.selectedIndex === -1 && tab.props.selected && !disabled
          || tab.key === this.props.selectedIndex
          || isFinite(this.props.selectedIndex) && parseInt(this.props.selectedIndex, 10) === index) {
        selected = true;
      }

      return React.cloneElement(tab, {
        onClick: this.handleClick.bind(this, index, tab.key, disabled),
        selected: selected,
        disabled: disabled,
      });
    });
  }

  createAside(asideChildren) {
    return React.Children.map(asideChildren, aside => {
      return React.cloneElement(aside);
    });
  }

  handleClick(index, key, disabled, e) {
    e.preventDefault();
    if (this.props.onTabChanged && !disabled) {
      this.props.onTabChanged(index, key);
    }
  }

  render() {
    const {className, ...props} = this.props;
    const tabsList = this.createTabs(this.getChildOfType(Tab));
    const asideItems = this.createAside(this.getChildOfType(TabListAside));

    return (
        <div className={cx('TabList', className)} {...props}>
          <nav className="TabList-Navigation">
            <ul role="tabslist" className="TabList-Menu">
              {tabsList}
            </ul>
            {asideItems}
          </nav>
        </div>
    );
  }
}
