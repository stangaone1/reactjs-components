import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import Dropdown from 'views/components/dropdown';
import {debounce} from 'lodash';
import './dropdown-tooltip.scss';

function findAncestorByClass(element, className) {
  while (!element.classList.contains(className)) {
    return element.parentElement;
  }
  return element;
}

export default class DropdownTooltip extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    isLoaded: PropTypes.bool,
    debounceEnter: PropTypes.number,
    debounceLeave: PropTypes.number,
    onShow: PropTypes.func,
  };

  static defaultProps = {
    debounceEnter: 100,
    debounceLeave: 500,
    isLoaded: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      customDropdownTop: null,
      customDropdownLeft: null,
    };
    this.debounceEnter = debounce(this.handleOpen.bind(this), props.debounceEnter, {leading: false});
    this.onMouseLeave = debounce(this.cancelOpen.bind(this), props.debounceLeave, {leading: false});
    this.handleMouseEnter = this.onMouseEnter.bind(this);
    this.handleOnClick = this.handleOpen.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate() {
    if (this.state.open && this.props.isLoaded) {
      const tableElement = findAncestorByClass(findDOMNode(this).parentElement, 'Table-container');
      const tooltipElement = findDOMNode(this);
      const dropdownBodyElement = tooltipElement.querySelectorAll('.Dropdown-body')[0];

      const tableRect = tableElement.getBoundingClientRect();
      const tooltipRect = tooltipElement.getBoundingClientRect();
      if (dropdownBodyElement) {
        const tooltipBodyRect = dropdownBodyElement.getBoundingClientRect();

        if (tableRect.top + tableRect.height < tooltipBodyRect.top + tooltipBodyRect.height) {
          if (this.state.customDropdownTop !== tooltipRect.top + tooltipRect.height + 11) {
            this.updateStateFixed(tooltipRect, tooltipBodyRect);
          }
        } else {
          if (this.state.customDropdownTop !== null) {
            this.updateStateNonFixed();
          }
        }
      }
    }
  }
  cancelOpen() {
    if (this.state.open && this.props.isLoaded) {
      this.debounceEnter.cancel();
      this.setState({
        open: false,
      });
    }
  }

  onMouseEnter() {
    this.onMouseLeave.cancel();
    this.debounceEnter();
  }

  handleOpen() {
    if (!this.state.open) {
      this.setState({
        open: true,
      }, () => {
        if (this.props.onShow) {
          this.props.onShow(this.state.open);
        }
      });
    }
  }

  updateStateFixed(tooltipRect, tooltipBodyRect) {
    this.setState({
      customDropdownTop: tooltipRect.top + tooltipRect.height + 14,
      customDropdownLeft: tooltipRect.left + tooltipRect.width / 2 - tooltipBodyRect.width,
    });
  }

  updateStateNonFixed() {
    this.setState({
      customDropdownTop: null,
      customDropdownLeft: null,
    });
  }

  render() {
    const {className, children, ...props} = this.props;
    const componentClasses = cx('DropdownTooltip', className);
    let customDropdownBodyStyle = null;
    if (this.state.customDropdownTop) {
      customDropdownBodyStyle = {
        position: 'fixed',
        top: this.state.customDropdownTop,
        left: this.state.customDropdownLeft,
      };
    }

    return (
        <Dropdown
            {...props}
            open={this.state.open}
            onClick={this.handleOnClick}
            customBodyStyle={customDropdownBodyStyle}
            className={componentClasses}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.onMouseLeave}
            position={'center'}
        >
          {children}
        </Dropdown>
    );
  }
}
