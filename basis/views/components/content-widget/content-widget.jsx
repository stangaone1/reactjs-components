import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import {debounce} from 'lodash';

import {widgets} from './index.js';

import './content-widget.scss';

export default class PublishingPlatformWidget extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.string.isRequired,
    onRemove: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
    this.handleOnFocus = this.onFocus.bind(this);
    // Hack to avoid header focused flicker when
    // switching focus between sub fields
    this.handleOnBlur = debounce(this.onBlur.bind(this), 200);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onFocus() {
    this.handleOnBlur.cancel();
    this.setState({
      focused: true,
    });
  }

  onBlur() {
    this.setState({
      focused: false,
    });
  }

  render() {
    const {
      className,
      type,
      children,
      ...props,
      } = this.props;

    const componentClasses = cx('PublishingPlatformWidget', {
      'PublishingPlatformWidget--focused': this.state.focused,
    }, className);

    if (!widgets[type]) {
      return (
        <div className={componentClasses}>
          Cannot find widget of type "{type}"
        </div>
      );
    }

    const Widget = widgets[type];
    return (
      <Widget
        {...props}
        tabIndex="0"
        onFocus={this.handleOnFocus}
        onBlur={this.handleOnBlur}
        className={componentClasses}
      >
        {children}
      </Widget>
    );
  }
}

