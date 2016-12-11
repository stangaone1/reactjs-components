import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import listensToClickOutside from 'react-click-outside';

import {Button} from 'views/components/buttons';

import './button-expandible.scss';

@listensToClickOutside
export default class ButtonExpandible extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    label: PropTypes.string,
    long: PropTypes.bool,
    visible: PropTypes.bool,
    isVisible: PropTypes.func,
  };

  static defaultProps = {
    label: '...',
    long: true,
  };

  constructor() {
    super();
    this.state = {
      visible: false,
    };
    this.onMainButtonClick = this.onMainButtonClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onMainButtonClick() {
    this.setState({
      visible: !this.state.visible,
    }, () => {
      const {isVisible} = this.props;
      if (isVisible) {
        isVisible(!this.state.visible);
      }
    });
  }

  handleClickOutside() {
    this.setState({
      visible: false,
    }, () => {
      const {isVisible} = this.props;
      if (isVisible) {
        isVisible(false);
      }
    });
  }

  renderChildren() {
    const {children} = this.props;
    const buttonsClasses = cx('ButtonExpandible-container');

    let visible = this.state.visible;
    if (this.props.visible !== null && this.props.visible !== undefined) {
      visible = this.props.visible && this.state.visible;
    }

    let isError = false;

    children.map((child) => {
      if (child.props.error) {
        isError = true;
      }
    });
    if (isError) {
      visible = true;
    }

    if (visible) {
      return (
        <div className={buttonsClasses}>
          {children}
        </div>
      );
    }
  }

  render() {
    const {
      className,
      label,
      long,
      ...props,
    } = this.props;
    const componentClasses = cx('ButtonExpandible', className);

    let visible = this.state.visible;
    if (this.props.visible !== null && this.props.visible !== undefined) {
      visible = this.props.visible;
    }

    const mainButtonClasses = cx('ButtonExpandible-mainButton', {
      'ButtonExpandible-mainButton--selected': visible,
    });

    return (
      <div className={componentClasses} {...props}>
        <Button className={mainButtonClasses}
                onClick={this.onMainButtonClick}
                type={visible ? 'main' : 'submit'}
                block={long}
        >
          {label}
        </Button>
        {this.renderChildren()}
      </div>
    );
  }
}

