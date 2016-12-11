import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import Checkbox from 'views/components/checkbox';
import './checkbox-group.scss';


export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._renderChildren = this._renderChildren.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _onChange() {
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  _renderChildren() {
    return React.Children.map(this.props.children, (checkbox) => {
      return (
        <div className="CheckboxGroup-item">
          {React.cloneElement(checkbox, {
            checked: checkbox.props.checked,
            disabled: this.props.disabled || checkbox.props.disabled,
            onChange: checkbox.props.onChange,
          })}
        </div>
      );
    });
  }

  render() {
    const componentClass = {
      'CheckboxGroup': true,
    };

    const parentClass = {
      'CheckboxGroup-parent': true,
      'Checkbox--partial': this.props.partial,
      'Checkbox--partialDisabled': this.props.partial && this.props.disabled,
    };

    return (
      <div className={cx(componentClass, this.props.className)}>
        <Checkbox
          checked={this.props.checked}
          className={cx(parentClass)}
          disabled={this.props.disabled}
          label={this.props.label}
          onChange={this._onChange}
        />
        {this._renderChildren()}
      </div>
    );
  }
}

CheckboxGroup.displayName = 'CheckboxGroup';

CheckboxGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  className: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  partial: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

CheckboxGroup.defaultProps = {
  disabled: false,
};
