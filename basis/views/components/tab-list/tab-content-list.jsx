import React, {Component, PropTypes} from 'react';
import invariant from 'invariant';
import cx from 'classnames';

import restrictedCompare from 'lib/utils/restricted-compare';

import './tab-content-list.scss';

export default class TabContentList extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    selectedIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    renderHidden: PropTypes.bool,
  };

  static defaultProps = {
    selectedIndex: 0,
    renderHidden: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return restrictedCompare(this, nextProps, nextState);
  }

  renderTabContent() {
    const selectedIndex = this.props.selectedIndex;
    if (this.props.renderHidden) {
      return React.Children.map(this.props.children, (tab, index) => {
        return React.cloneElement(tab, {
          className: cx('TabContent-item', {
            'TabContent-item--selected': index === selectedIndex,
          })}
        );
      });
    }
    const selectedTabContent = React.Children.toArray(this.props.children).filter((tab, index) => {
      return selectedIndex === tab.key || selectedIndex === index;
    });

    invariant(selectedTabContent.length === 1, 'there should be one selected tab, found %s!', selectedTabContent.length);

    return selectedTabContent[0];
  }

  render() {
    const {className, children, selectedIndex, ...props} = this.props;

    return (
      <div className={cx('TabContent-List', className)} {...props}>
        {this.renderTabContent()}
      </div>);
  }
}
