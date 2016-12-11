import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import Checkbox from 'views/components/checkbox';

import './checkbox-list.scss';

export default class CheckboxList extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    className: PropTypes.string,
    value: PropTypes.array,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.node.isRequired,
        value: PropTypes.any.isRequired,
      })
    ).isRequired,
    element: PropTypes.any,
    prependAllOption: PropTypes.bool,
  };

  static defaultProps = {
    value: [],
    options: [],
    element: Checkbox,
  };

  constructor(props) {
    super(props);
    this.onBlur = this.mockEvent.bind(this, 'onBlur');
    this.onUpdate = this.mockEvent.bind(this, 'onUpdate');
    this.handleAllOptionChange = this.handleAllOptionChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  mockEvent(event) {
    if (this.props[event]) {
      this.props[event](this.props.value);
    }
  }

  handleChange(index) {
    if (this.props.onChange) {
      const optionValue = this.props.options[index].value;
      const found = this.props.value.indexOf(optionValue);
      let newValue;
      if (found > -1) {
        newValue = this.props.value.slice(0, found).concat(this.props.value.slice(found + 1));
      } else if (found < 0) {
        newValue = this.props.value.concat([optionValue]);
      }
      this.props.onChange(newValue, optionValue);
    }
  }

  handleAllOptionChange() {
    if (this.props.onChange) {
      const value = this.isAllChecked()
        ? []
        : this.props.options.map(o => o.value);

      this.props.onChange(value);
    }
  }

  isAllChecked() {
    return this.props.options.every(o => this.props.value.includes(o.value));
  }

  renderAllOption() {
    if (this.props.prependAllOption) {
      return (
        <this.props.element
          className="CheckboxList-item"
          onBlur={this.onBlur}
          onUpdate={this.onUpdate}
          onChange={this.handleAllOptionChange}
          key={-1}
          label="All"
          checked={this.isAllChecked()}
          type="checkbox"
        />
      );
    }
  }

  render() {
    const {className, onChange, ...props} = this.props;
    const componentClasses = cx('CheckboxList', className);
    return (
      <div {...props} className={componentClasses}>
        {this.renderAllOption()}
        {this.props.options.map((item, index) => {
          const {label, value, className, ...otherProps} = item;
          return (
            <this.props.element
              {...otherProps}
              className={cx('CheckboxList-item', className)}
              onBlur={this.onBlur}
              onUpdate={this.onUpdate}
              onChange={this.handleChange.bind(this, index)}
              key={index}
              label={label}
              checked={this.props.value.indexOf(value) > -1}
              type="checkbox"
            />
          );
        })}
      </div>
    );
  }
}

