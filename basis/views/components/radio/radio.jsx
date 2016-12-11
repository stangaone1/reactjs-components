import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import './radio.scss';

export default class Radio extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    required: PropTypes.bool,
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    onChange: () => {
    },
    required: false,
  };

  constructor() {
    super();

    this.renderRequired = this.renderRequired.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    if (this.props.disabled || !this.props.onChange) {
      return null;
    }
    if (this.props.onChange) {
      this.props.onChange(event.target.checked, event);
    }
  }

  renderRequired() {
    if (!this.props.required) return null;

    return <span className="Radio-required">*</span>;
  }

  render() {
    const attributes = {
      checked: this.props.checked,
      disabled: this.props.disabled,
    };

    const radioClass = {
      'Radio': true,
    };

    return (
      <label className={cx(radioClass, this.props.className)}>
        <input
          className="Radio-input"
          type="radio"
          onChange={this.onChange}
          {...attributes}
        />
        <span className="Radio-simulator"/>
        <span className="Radio-text">{this.props.label}</span>
        {this.renderRequired()}
      </label>
    );
  }
}
