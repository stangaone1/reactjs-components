import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {map, max} from 'lodash';
import shallowCompare from 'react-addons-shallow-compare';
import cx from 'classnames';
import {dropdownGroupPropTypes} from 'lib/utils/propTypes';

import './dropdown-group.scss';

export default class DropdownGroup extends Component {
  constructor() {
    super();
    this.state = {
      containerWidth: 0,
    };
  }

  componentDidMount() {
    if (this.state.containerWidth === 0) {
      /* eslint react/no-did-mount-set-state: 0 */
      this.setState({
        containerWidth: this._findlargestDropdown(),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _findlargestDropdown() {
    const dropdownGroupNode = findDOMNode(this);
    return max(map(dropdownGroupNode.children, (dropdownNode) => {
      return dropdownNode.offsetWidth || 0;
    }));
  }

  _getChildren() {
    return React.Children.map(this.props.children, (child) => {
      // don't clone nulls
      if (child) {
        return React.cloneElement(child, {
          style: {width: this.state.containerWidth},
        });
      }
    });
  }

  render() {
    const children = this.state.containerWidth !== 0 ? this._getChildren() : this.props.children;


    const style = {
      width: this.state.containerWidth === 0 ? 0 : this.state.containerWidth * React.Children.count(children),
    };

    const dropdownClasses = cx(
      'Dropdown-group',
      {
        'Dropdown-group--hidden': this.state.containerWidth === 0,
      },
      this.props.className
    );

    return (
      <div style={this.state.containerWidth !== 0 ? style : {}} className={dropdownClasses}>
        {children}
      </div>
    );
  }
}

DropdownGroup.displayName = 'DropdownGroup';
DropdownGroup.propTypes = {
  children: dropdownGroupPropTypes,
  className: PropTypes.string,
};
