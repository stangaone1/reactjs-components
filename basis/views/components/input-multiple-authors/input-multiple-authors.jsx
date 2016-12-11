import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import InputField from 'views/components/inputfield';
import Checkbox from 'views/components/checkbox';
import {cloneDeep} from 'lodash';


import './input-multiple-authors.scss';

export default class InputMultipleAuthors extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
    max: PropTypes.number,
    disabled: PropTypes.any,
    fullNamePlaceholder: PropTypes.string,
    jobPlaceholder: PropTypes.string,
    sitePlaceholder: PropTypes.string,
    // other propTypes here
  };

  static defaultProps = {
    max: 2,
    fullNamePlaceholder: 'Full name',
    jobPlaceholder: 'Profession / Job Title and Company Name',
    sitePlaceholder: 'Personal or Company Website',
    // default propTypes here
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleChange(index, field, val) {
    const newValues = cloneDeep(this.props.value);
    newValues[index][field] = val;
    if (this.props.onChange) {
      this.props.onChange(newValues);
    }
  }

  blockEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  addField() {
    if (this.props.onChange) {
      this.props.onChange(this.props.value.concat([{}]));
    }
  }

  handleRemoveAuthor(index) {
    const newValues = this.props.value.slice();
    newValues.splice(index, 1);

    if (this.props.onChange) {
      this.props.onChange(newValues);
    }
  }

  handleDisableChange() {
    if (this.props.onChange) {
      this.props.onChange(!this.props.value || !this.props.value.length ? [{}] : []);
    }
  }

  renderRemoveButton(index) {
    if (this.props.value && this.props.value.length > 1) {
      return (
        <a href="#" className="InputMultipleAuthors-remove" onClick={this.handleRemoveAuthor.bind(this, index)}>
          - Remove
        </a>
      );
    }
  }

  renderAddButton(disabled) {
    if (!this.props.value || (!this.props.max || this.props.value.length < this.props.max)) {
      return (
        <li>
          <a
            className={cx(
            'InputMultipleAuthors-add',
             {'InputMultipleAuthors-add--disabled': disabled || !this.props.value || !this.props.value.length}
             )}
            onClick={!disabled && this.props.value && this.addField.bind(this)}
          >
            + Add Author
          </a>
        </li>
      );
    }
  }

  render() {
    const {
      className,
      value, disabled,
      onChange,
      fullNamePlaceholder,
      jobPlaceholder,
      sitePlaceholder,
      ...props,
      } = this.props;
    const componentClasses = cx('InputMultipleAuthors', {
      // modifiers here
    }, className);

    return (
      <ul {...props} className={componentClasses}>
        <li>
          <Checkbox
            onBlur={this.blockEvent}
            disabled={disabled}
            className="InputMultipleAuthors-displayAuthors"
            label="Display author(s)"
            onChange={this.handleDisableChange.bind(this)}
            checked={value && value.length}
          />
        </li>
        {
          (value && value.length ? value : [{}]).map((val, index) => {
            return (
              <li key={index}>
                <InputField
                  onBlur={this.blockEvent}
                  className="InputMultipleAuthors-fullName"
                  placeholder={fullNamePlaceholder}
                  value={val.fullName}
                  disabled={!value || !value.length}
                  error={!(!value || !value.length) && (!val.fullName || !val.fullName.length) && 'Full name is mandatory'}
                  onChange={this.handleChange.bind(this, index, 'fullName')}
                />
                <InputField
                  onBlur={this.blockEvent}
                  className="InputMultipleAuthors-jobTitle"
                  placeholder={jobPlaceholder}
                  value={val.jobTitle}
                  disabled={!value || !value.length}
                  error={!(!value || !value.length) && (!val.jobTitle || !val.jobTitle.length) && 'Job title is mandatory'}
                  onChange={this.handleChange.bind(this, index, 'jobTitle')}
                />
                <InputField
                  onBlur={this.blockEvent}
                  className="InputMultipleAuthors-website"
                  placeholder={sitePlaceholder}
                  value={val.website}
                  disabled={!value || !value.length}
                  type="url"
                  onChange={this.handleChange.bind(this, index, 'website')}
                />
                {!disabled && this.renderRemoveButton(index)}
              </li>
            );
          })
        }
        {this.renderAddButton(disabled)}
      </ul>
    );
  }
}


