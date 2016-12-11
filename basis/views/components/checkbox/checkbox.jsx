import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import './checkbox.scss';

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.node,
    required: PropTypes.bool,
    isPartial: PropTypes.bool,
  };

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false,
    onChange: () => {
    },
    label: '',
    required: false,
    isPartial: false,
  };


  onChange(event) {
    event.stopPropagation();

    if (this.props.disabled || !this.props.onChange) {
      if (this.props.disabled) {
        event.preventDefault();
      }
      return null;
    }

    this.props.onChange(event.target.checked, event);
  }

  getValue() {
    return this.refs.input.checked;
  }

  renderRequired() {
    if (!this.props.required) return null;

    return <span className="Checkbox-required">*</span>;
  }

  render() {
    const {
      className,
      label,
      ...props,
      } = this.props;

    const checkboxClass = cx('Checkbox', {
      'Checkbox--disabled': this.props.disabled,
      'Checkbox--checked': this.props.checked,
      'Checkbox--partial': this.props.isPartial,
    }, className);

    return (
      <label className={checkboxClass}>
        <input
          {...props}
          className="Checkbox-input"
          onChange={this.onChange.bind(this)}
          ref="input"
          type="checkbox"
        />
        <span className="Checkbox-simulator"></span>
        <span className="Checkbox-text">
          {label}
        </span>
        {this.renderRequired()}
      </label>
    );
  }
}
