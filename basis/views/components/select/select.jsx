import React, {Component, PropTypes, Children} from 'react';
import cx from 'classnames';
import listensToClickOutside from 'react-click-outside';
import shallowCompare from 'react-addons-shallow-compare';

import SelectOption from './select-option';

import './select.scss';


@listensToClickOutside
export default class Select extends Component {
  static propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    children: PropTypes.node,
    value: PropTypes.any,
    multiple: PropTypes.bool,
    required: PropTypes.bool,
    options: PropTypes.array,
    disabled: PropTypes.bool,
    placeholder: PropTypes.node,
    selectLabel: PropTypes.node,
    label: PropTypes.string,
    onChange: PropTypes.func,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // other propTypes here
  };

  static defaultProps = {
    multiple: false,
    required: false,
    tabIndex: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      focused: -1,
      selected: this.extractSelectedFromProps(props),
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
/*
    const relevantStateKeys = [
      'selected',
      'opened',
      'focused',
    ];

    if (compareProps(nextState, this.state, relevantStateKeys)) {
      return true;
    }

    const relevantPropsKeys = [
      'className',
      'value',
      'error',
      'multiple',
      'options',
      'label',
      'disabled',
    ];

    return compareProps(nextProps, this.props, relevantPropsKeys);
*/
  }

  componentDidUpdate(prevProps) {
    const hasDifferentOptions = Children.count(prevProps.children) !== Children.count(this.props.children);
    if (prevProps.value !== this.props.value || prevProps.value && prevProps.value.length !== this.props.value.length || hasDifferentOptions) {
      this.updateSelectedFromProps();
    }
  }

  getOptionIndex(option) {
    return this.state.selected.findIndex((item) => item && item.value === option.value);
  }

  getInChildrenLength(focused) {
    let newFocus = focused;
    if (newFocus < 0) {
      newFocus = this.props.options ? this.props.options.length : this.props.children.length;
    }

    if (newFocus >= (this.props.options ? this.props.options.length : this.props.children.length)) {
      newFocus = 0;
    }
    return newFocus;
  }

  handleClickOutside() {
    this.setState({
      opened: false,
    });
  }

  handleOptionClick(option, index, e) {
    if (option.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    let selectedList = this.state.selected.slice(0);
    const args = [];

    if (this.props.multiple) {
      e.stopPropagation();

      const index = this.getOptionIndex(option);
      if (index > -1) {
        selectedList.splice(index, 1);
      } else {
        selectedList.push(option);
      }

      args.push(selectedList.map((o) => o && o.children));
      args.push(selectedList.map((o) => o && o.value));
      args.push(selectedList);
    } else {
      selectedList = [option];
      args.push(option.value);
      args.push(option.children);
    }

    args.push(e);

    if (this.props.onChange) {
      this.props.onChange(...args);
    }

    this.setState({
      focused: index,
    });

    if (!e.isDefaultPrevented()) {
      this.setState({
        selected: selectedList,
      });
    }
  }

  handleKeyDown(e) {
    const focused = this.state.focused;
    switch (e.which) {
    case 38:
      this.focusOption(focused - 1);
      e.preventDefault();
      break;
    case 40:
      this.focusOption(focused + 1);
      e.preventDefault();
      break;
    case 13:
    case 32:
      this.handleOptionClick(this.props.children[focused].props, focused, e);
      e.preventDefault();
      break;
    default:
      break;
    }
  }

  toggle(opened) {
    if (this.props.disabled) {
      return;
    }

    this.setState({
      opened: typeof opened === 'boolean' ? opened : !this.state.opened,
      focused: -1,
    });
  }


  extractSelectedFromProps(props) {
    let selectedOptions = props.options || React.Children.toArray(props.children).map((o) => o.props);

    selectedOptions = selectedOptions.filter((opt) => {
      if (props.value) {
        if (props.value instanceof Array) {
          return props.value.indexOf(opt.value) > -1;
        }
        return opt.value === props.value;
      }
      return opt.selected;
    });

    if (!props.multiple && selectedOptions.length > 1) {
      selectedOptions = [selectedOptions[0]];
    }
    return selectedOptions.filter((o) => !!o);
  }

  updateSelectedFromProps() {
    this.setState({
      selected: this.extractSelectedFromProps(this.props),
    });
  }

  focusOption(index) {
    this.setState({
      focused: this.getInChildrenLength(index),
      open: true,
    });
  }

  renderOptionList(fromChildren, options) {
    if (!this.state.opened) {
      return void 0;
    }
    let optionList;
    if (fromChildren) {
      optionList = React.Children.toArray(options).map((option) => option.props);
    } else {
      optionList = options;
    }

    return optionList.map((option, index) => {
      const {key, ...otherProps} = option;
      return (
        <SelectOption
          {...otherProps}
          key={key || index}
          selected={this.getOptionIndex(option) > -1}
          focused={this.state.focused === index}
          onMouseEnter={this.focusOption.bind(this, index)}
          onClick={this.handleOptionClick.bind(this, option, index)}
        >
          {option.label || option.children}
        </SelectOption>
      );
    });
  }

  renderError() {
    if (this.props.error) {
      return (<p className="Select-error">{this.props.error}</p>);
    }
  }

  renderSelectLabel() {
    const props = this.props;
    const selected = this.state.selected;
    const {selectLabel} = props;
    let label;
    if (typeof selectLabel === 'string' && selected.length) {
      let number = selected.length;

      if (selected.length === (props.options ? props.options.length : props.children.length)) {
        number = 'All';
      }

      label = selectLabel.replace('{number}', number);
    }

    if (!label && typeof selectLabel !== 'string') {
      label = selectLabel;
    }

    if (!label && (!props.multiple || selected.length === 1)) {
      const selectedItem = selected[0];
      if (selectedItem) {
        label = selectedItem.label || selectedItem.children;
      }
    }

    if (!label && props.multiple && selected.length && !selectLabel) {
      label = `Selected ${selected.length} items`;
    }

    if (!label && props.placeholder) {
      label = props.placeholder;
    }

    if (!label) {
      label = 'Select...';
    }

    return (
      <label className="Select-InputLabel">
        <span className="Select-InputLabel-Text">
          {label}
        </span>
        <span className="Select-InputLabel-Arrow"/>
      </label>
    );
  }

  renderLabel() {
    const {label} = this.props;
    if (!label) return null;
    return (
      <div className="Select-Label">
        {this.props.label}
      </div>
    );
  }

  render() {
    const {className, children, disabled, multiple, required, options, error, label, onChange, value, tabIndex, ...props} = this.props;
    const componentClasses = cx('Select', {
      'Select--opened': this.state.opened,
      'Select--hasValue': this.state.selected.length > 0,
      'Select--multiple': multiple,
      'Select--required': required,
      'Select--error': error,
      'Select--disabled': disabled,
    }, className);

    return (
      <div>
        {this.renderLabel()}
        <div
          {...props}
          className={componentClasses}
          tabIndex={tabIndex}
          onKeyDown={this.handleKeyDown.bind(this)}
          onClick={this.toggle.bind(this)}
        >
          {this.renderSelectLabel()}
          <div className="Select-Dropdown">
            <ul className="Select-Dropdown-List">
              {this.renderOptionList(!options, options || children)}
            </ul>
          </div>
        </div>
        {this.renderError()}
      </div>
    );
  }
}
