import React, { Component, PropTypes } from 'react';
import {debounce} from 'lodash';
import cx from 'classnames';

import './inputfield.scss';

class InputField extends Component {

  static propTypes = {
    className: PropTypes.string,
    debounceTimeout: PropTypes.number,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    touched: PropTypes.bool,
    icon: PropTypes.element,
    iconRemove: PropTypes.element,
    iconLeft: PropTypes.element,
    iconClick: PropTypes.func,
    iconRemoveClick: PropTypes.func,
    iconLeftClick: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    numericOnly: PropTypes.bool,
    maxLength: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    multiline: PropTypes.bool,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    resizable: PropTypes.bool,
    remove: PropTypes.bool,
    required: PropTypes.bool,
    success: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    debounceTimeout: 0,
    multiline: false,
    remove: false,
    placeholder: '',
    onChange: ()=> {
    },
    onBlur: ()=> {
    },
  };

  constructor(props) {
    super(props);
    this.debounceChangeCallback = debounce((func) => {
      func();
    }, this.props.debounceTimeout);

    this.state = {
      inputValue: props.value || props.defaultValue,
    };
  }

  // react methods
  componentWillMount() {
    this.setState({
      inputValue: this.props.value,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        inputValue: nextProps.value,
      });
    }
  }

  onChange(ev) {
    const {max, numericOnly } = this.props;
    let inputValue = ev.target.value;
    if (!this.props.disabled) {
      // validate numeric values
      if (numericOnly) {
        inputValue = !isNaN(parseFloat(inputValue)) ? parseFloat(inputValue) : '';
        inputValue = inputValue > max ? max : inputValue;
      }

      this.setState({
        inputValue: inputValue,
      });

      this.debounceChangeCallback(
          this.props.onChange.bind(this, inputValue, ev)
      );
    }
  }

  onBlur(ev) {
    const { disabled, onBlur, min, numericOnly } = this.props;
    let inputValue = ev.target.value;

    if (numericOnly) {
      inputValue = !isNaN(parseFloat(inputValue)) ? parseFloat(inputValue) : min;
      inputValue = inputValue < min ? min : inputValue;

      this.setState({
        inputValue: inputValue,
      });
    }

    if (!disabled && onBlur) {
      onBlur(ev);
    }
  }

  onKeyDown(ev) {
    const inputValue = ev.currentTarget.value;
    if ((ev.keyCode === 13) && (this.props.onChange)) {
      // stop browser from sending default 'forms' on enter key
      ev.preventDefault();

      // cancel any debounced calls
      this.debounceChangeCallback.cancel();

      // direct call of onChange function
      this.props.onChange(inputValue, ev);
    }
  }

  renderInput(inputId) {
    const {disabled, name, numericOnly, maxLength, placeholder, type, ...props} = this.props;
    let inputType;
    if (type) {
      inputType = type;
    } else {
      inputType = numericOnly ? 'number' : 'text';
    }

    if (this.props.multiline) {
      return (
          <textarea
              {...props}
              name={name}
              id={inputId}
              className="InputField-Input"
              disabled={disabled}
              maxLength={maxLength}
              placeholder={placeholder}
              value={this.state.inputValue}
              onChange={this.onChange.bind(this)}/>
      );
    }

    return (
        <input
            {...props}
            name={this.props.name}
            id={inputId}
            type={inputType}
            className="InputField-Input"
            disabled={disabled}
            maxLength={maxLength}
            placeholder={placeholder}
            value={this.state.inputValue}
            onChange={this.onChange.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onKeyDown={this.onKeyDown.bind(this)}
        />
    );
  }

  renderRemoveIcon() {
    const {iconRemoveClick, iconRemove, remove} = this.props;
    if (remove) {
      const removeIconClasses = cx('InputField-IconButton', 'InputField-IconButton--remove');
      return (
          <div className={removeIconClasses} onClick={iconRemoveClick ? iconRemoveClick : null}>
            {iconRemove}
          </div>
      );
    }
  }

  renderIcon(iconPosition) {
    const {icon, iconLeft, iconClick, iconLeftClick} = this.props;

    const leftClassname = {
      'InputField-IconButton': true,
      'InputField-IconButton--clickable': iconLeftClick,
      'InputField-IconButton--left': true,
    };

    const rightClassname = {
      'InputField-IconButton': true,
      'InputField-IconButton--clickable': iconClick,
    };

    if ((iconPosition === 'right') && (icon)) {
      return (
          <div className={cx(rightClassname)} onClick={iconClick ? iconClick : null}>
            {icon}
          </div>
      );
    } else if ((iconPosition === 'left') && (iconLeft)) {
      return (
          <div className={cx(leftClassname)} onClick={iconLeftClick ? iconLeftClick : null}>
            {iconLeft}
          </div>
      );
    }
  }

  render() {
    const {
        name,
        className,
        touched,
        error,
        icon,
        iconLeft,
        label,
        remove,
        multiline,
        resizable,
        required,
        success,
        disabled,
        } = this.props;
    const inputUniqueId = name ? name : 'genericInputFieldId_' + Date.now();

    const inputFieldClasses = {
      'InputField': true,
      'InputField--icon': icon,
      'InputField--iconLeft': iconLeft,
      'InputField--error': touched && error,
      'InputField--remove': remove,
      'InputField--multiline': multiline,
      'InputField--multiline-resizeable': resizable,
      'InputField--required': required,
      'InputField--success': success,
      'disabled': disabled,
    };

    return (
        <div className={cx(inputFieldClasses, className)}>
          <label className="InputField-Label" htmlFor={inputUniqueId}>{label}</label>
          <div className="InputField-InputHolder">
            {this.renderInput(inputUniqueId)}
            {this.renderIcon('right')}
            {this.renderIcon('left')}
            {this.renderRemoveIcon()}
          </div>
          {touched && error && <p className="InputField-Error">{error}</p>}
        </div>
    );
  }
}

export default InputField;
