
import React, {Component, PropTypes} from 'react';
import Checkbox from '../checkbox/checkbox';
import cx from 'classnames';
import './checkbox-section.scss';

export default class CheckboxSection extends Component {
  constructor() {
    super();

    this._onClick = this._onClick.bind(this);
    this._renderText = this._renderText.bind(this);
  }

  _onClick(evt) {
    // prevent multiple `click` triggers when `evt.target` is checkbox
    evt.preventDefault();
    if (this.props.disabled || this.props.done || !this.props.onChange) {
      return null;
    }

    this.props.onChange(!this.refs.checkbox.getValue());
  }

  _renderText() {
    if (!this.props.text) return null;

    return (
      <span className="CheckboxSection-text">
        {this.props.text}
      </span>
    );
  }

  render() {
    const componentClass = {
      CheckboxSection: true,
      'CheckboxSection--checked': this.props.checked,
      'CheckboxSection--disabled': this.props.disabled,
      'CheckboxSection--noText': !this.props.text,
      'CheckboxSection--done': this.props.done,
    };

    if (this.props.className) {
      componentClass[this.props.className] = true;
    }

    return (
      <div
        className={cx(componentClass)}
        onClick={this._onClick}
        title={this.props.title}
      >
        <Checkbox
          checked={this.props.checked}
          disabled={this.props.disabled}
          label={this.props.label}
          ref="checkbox"
          required={this.props.required}
        />
        {this._renderText()}
        {this.props.children}
      </div>
    );
  }
}

CheckboxSection.displayName = 'CheckboxSection';

CheckboxSection.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.node,
  title: PropTypes.string,
  required: PropTypes.bool,
  text: PropTypes.node,
  done: PropTypes.bool,
  children: PropTypes.node,
};

CheckboxSection.defaultProps = {
  checked: false,
  disabled: false,
  onChange: () => {},
  label: '',
  required: false,
  done: false,
};
